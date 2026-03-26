import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/lib/prisma";

const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  stack: z.array(z.string()).min(1, "Add at least one technology"),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

const updateProjectSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  stack: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

const getAllProjectsSchema = z
  .object({
    status: z.enum(["draft", "published", "all"]).default("all"),
    featuredOnly: z.boolean().default(false),
  })
  .optional();

export const projectRouter = router({
  getAll: publicProcedure
    .input(getAllProjectsSchema)
    .query(async ({ input }) => {
      return await prisma.project.findMany({
        where: {
          ...(input?.status && input.status !== "all"
            ? { status: input.status }
            : {}),
          ...(input?.featuredOnly ? { featured: true } : {}),
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      });
    }),

  create: protectedProcedure
      .input(createProjectSchema)
      .mutation(async ({ input, ctx }) => {
        return await prisma.project.create({
          data: {
            ...input,
            authorId: ctx.session.user.id,
            publishedAt: input.status === 'published' ? new Date(): null,
          },
        })
      }),

  update: publicProcedure
    .input(updateProjectSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      const existing = await prisma.project.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new Error("Project not found");
      }

      return await prisma.project.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const existing = await prisma.project.findUnique({
        where: { id: input.id },
      });

      if (!existing) {
        throw new Error("Project not found");
      }

      await prisma.project.delete({
        where: { id: input.id },
      });

      return { success: true, id: input.id };
    }),

  toggleFeatured: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const project = await prisma.project.findUnique({
        where: { id: input.id },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      return await prisma.project.update({
        where: { id: input.id },
        data: { featured: !project.featured },
      });
    }),
});

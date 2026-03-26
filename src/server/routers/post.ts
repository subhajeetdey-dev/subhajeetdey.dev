import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/lib/prisma";

const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(
      /^[a-z0-9-]+$/,
      "slug can only contain lowercase latters, numbers and hyphens",
    ),
  content: z.string().min(1, "Context is required"),
  excerpt: z.string().max(300).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
});

const updatePostSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(200).optional(),
  slug: z
    .string()
    .max(200)
    .regex(
      /^[a^z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens",
    )
    .optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().max(300).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published"]).optional(),
});

const getAllPostsSchema = z
  .object({
    status: z.enum(["draft", "published", "all"]).default("all"),
    category: z.string().optional(),
    limit: z.number().min(1).max(100).default(20),
    offset: z.number().min(0).default(0),
  })
  .optional();

export const postRouter = router({
  getAll: publicProcedure.input(getAllPostsSchema).query(async ({ input }) => {
    return await prisma.post.findMany({
      where: {
        ...(input?.status && input.status !== "all"
          ? { status: input.status }
          : {}),
        ...(input?.category ? { category: input.category } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: input?.limit ?? 20,
      skip: input?.offset ?? 0,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        status: true,
        category: true,
        tags: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ input }) => {
      const post = await prisma.post.findUnique({
        where: { slug: input.slug },
      });

      if (!post) {
        throw new Error(`Post not found: ${input.slug}`);
      }

      return post;
    }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ input, ctx }) => {
      return await prisma.post.create({
        data: {
          ...input,
          authorId: ctx.session.user.id,
          publishedAt: input.status === 'published' ? new Date(): null,
        },
      })
    }),

    update: publicProcedure.input(updatePostSchema)
    .mutation(async({ input }) => {
      const {id, ...data} = input

      if(data.slug) {
        const existing = await prisma.post.findUnique({
          where: {slug: data.slug},
        })
        if( existing && existing.id !== id) {
          throw new Error ('A post with this slug already exists')
        }
      }

      return await prisma.post.update({
        where: {id},
        data: {
          ...data,
          updatedAt: new Date(),
        },
      })
    }),

    delete: publicProcedure.input(z.object({
      id: z.string().cuid(),
    }))
    .mutation(async ({ input }) => {
      await prisma.post.delete({
        where: {id: input.id},
      })

      return {success: true, id: input.id}
    }),

    publish: publicProcedure.input(z.object({
      id: z.string().cuid(),
      publish: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.post.update({
        where: {id: input.id},
        data: {
          status: input.publish ? 'published' : 'draft',
          publishedAt: input.publish? new Date() : null,
        },
      })
    }),
});

import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateNextContentOptions } from '@trpc/server/adapter/next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import superjson from 'superjson';

export const createContext = async (opts: CreateNextContentOptions) => {
    const session = await getServerSession(opts.req, opts.res, authOptions)

    return {
        session,
        prisma,
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create({
    transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

const isAuthed = t.middleware(({ ctx, next }) => {
    if(!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next({
        ctx: {
            session: ctx.session,
        },
    })
})


export const protectedProcedure = t.procedure.use(isAuthed)
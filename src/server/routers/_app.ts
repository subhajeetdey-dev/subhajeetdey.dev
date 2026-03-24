import { router } from '../trpc';
import { postRouter } from './post';
import { projectRouter } from './project';

export const appRouter = router ({
    post: postRouter,
    project: projectRouter,
})

export type AppRouter = typeof appRouter
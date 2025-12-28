import { projectRouter } from "@/modules/projects/server/procedures";
import { createTRPCRouter } from "../init";
import { messageTRPCRouter } from "@/modules/messages/server/procedures";
import { usageRouter } from "@/modules/usage/server/procedures";
export const appRouter = createTRPCRouter({
  messages: messageTRPCRouter,
  projects: projectRouter,
  usage: usageRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

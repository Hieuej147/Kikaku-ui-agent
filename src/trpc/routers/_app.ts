import { createTRPCRouter } from "../init";
import { messageTRPCRouter } from "@/modules/messages/server/procedures";
export const appRouter = createTRPCRouter({
  messages: messageTRPCRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

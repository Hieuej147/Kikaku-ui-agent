"use client";

import { useTRPC } from "@/trpc/client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MessagesContainer } from "../components/message-container";
import { Suspense } from "react";

interface Props {
  projectId: string;
}

export const Projectview = ({ projectId }: Props) => {
  const trpc = useTRPC();
  // const { data: project } = useSuspenseQuery(
  //   trpc.projects.getOne.queryOptions({
  //     id: projectId,
  //   })
  // );

  return (
    <>
      <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={35}
            minSize={20}
            className="flex flex-col min-h-0"
          >
            {/* {JSON.stringify(project)} */}
            <Suspense fallback={<p>Loading messages...</p>}>
              <MessagesContainer projectId={projectId} />
            </Suspense>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={65} minSize={30} maxSize={80} className="min-h-0">
            {/* {JSON.stringify(messages, null, 2)} */}
            TODO: Preview
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

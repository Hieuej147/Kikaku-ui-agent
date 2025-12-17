"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const router = useRouter()
  const [value, setvalue] = useState("");
  const trpc = useTRPC();
  // const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data)=>{
        router.push(`/projects/${data.id}`)
      }
    })
  );
  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    //   <Suspense fallback={<p>Loading...</p>}>
    //     <Client />
    //   </Suspense>
    // </HydrationBoundary>
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setvalue(e.target.value)} />
      <Button
        disabled={createProject.isPending}
        onClick={() => createProject.mutate({ value: value })}
      >
        Submit
      </Button>
      {/* {JSON.stringify(messages, null, 2)} */}
    </div>
  );
};
export default Home;

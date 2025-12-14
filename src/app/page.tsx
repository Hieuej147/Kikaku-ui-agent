"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [value,setvalue] = useState("")
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () =>{
      toast.success("Invoked Successfully")
    }
  }))
  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    //   <Suspense fallback={<p>Loading...</p>}>
    //     <Client />
    //   </Suspense>
    // </HydrationBoundary>
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e)=> setvalue(e.target.value)}/>
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({value: value})}>Invoke Background Job</Button>
    </div>
  );
};
export default Home;

import { Sandbox } from "@e2b/code-interpreter";
import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("kikaku-nextjs-hieu-bc-v2");
      return sandbox.sandboxId;
    });
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert Web developer.  You write readable, maintainable code. You can write react, nextjs components",
      model: openai({ model: "gpt-4o-mini" }),
    });
    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    );
    console.log(output);
    // [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]
    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    return { output, sandboxUrl };
  }
);

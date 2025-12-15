import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export const getSandbox = async (sanboxId: string) => {
  const sandbox = await Sandbox.connect(sanboxId);
  return sandbox;
};
export function lastAssistantTextMessageContent(result: AgentResult) {
  const findIndexlastMessage = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );
  const message = result.output[findIndexlastMessage] as
    | TextMessage
    | undefined;
  return message?.content
    ? typeof message.content === "string"
      ? message.content
      : message.content.map((c) => c.text).join("")
    : undefined;
}

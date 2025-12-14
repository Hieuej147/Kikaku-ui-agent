import {Sandbox} from "@e2b/code-interpreter";

export const getSandbox = async(sanboxId: string)=>{
    const sandbox = await Sandbox.connect(sanboxId)
    return sandbox
} 
import { promise, z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const CreateSafeAction=<TInput,TOutput>(
  schema:z.Schema<TInput>,
  handler:(validatedData:TInput)=>Promise<ActionState<TInput,TOutput>>
)=>{
  return async (data:Tinput)
}
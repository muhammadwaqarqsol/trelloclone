import { TypeOf, z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";
import { Board } from "@prisma/client";

export type InputType = z.infer<typeof DeleteBoard>;

export type ReturnType=ActionState<InputType,Board>
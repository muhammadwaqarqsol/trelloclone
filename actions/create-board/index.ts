// "use server";

// import { ZodNull, z } from "zod";

// import { db } from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// export type State = {
//   errors?: {
//     title?: string[];
//   };
//   message?: null | string;
// };

// const CreateBoard = z.object({
//   title: z.string().min(3, {
//     message: "Minimum length of 3 letters is required",
//   }),
// });

// export async function create(prevState: State, formData: FormData) {
//   const validatedFields = CreateBoard.safeParse({
//     title: formData.get("title"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing fields.",
//     };
//   }

//   const { title } = validatedFields.data;

//   try {
//     await db.board.create({
//       data: {
//         title,
//       },
//     });
//   } catch (error) {
//     return {
//       message: "Database Error",
//     };
//   }

//   revalidatePath("/organization/org_2XwLIDt5x0Ay86prfZg7BqrELWR");
//   redirect("/organization/org_2XwLIDt5x0Ay86prfZg7BqrELWR");
// }

"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "UnAuthorized",
    };
  }

  const { title } = data;

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return {
    data: board,
  };
};

export const createBoard = CreateSafeAction(CreateBoard, handler);

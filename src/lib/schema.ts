import { TypeOf, boolean, object, string } from "zod";

export const TodoSchema = object({
  title: string({ required_error: "Todo title is required" }).min(
    1,
    "Todo title is required"
  ),
  completed: boolean().optional(),
});

export type TodoSchemaType = TypeOf<typeof TodoSchema>;

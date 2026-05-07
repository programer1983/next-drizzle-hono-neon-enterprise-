import { Context } from "hono";

export const getUser = async (c: Context) => {
  return c.json({
    users: [{ id: 1, name: "Jon Dorian" }],
    message: "List of users received",
  });
};

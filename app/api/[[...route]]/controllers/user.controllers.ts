import { Context } from "hono";

export const getUser = async (c: Context) => {
  return c.json({
    users: [
      { id: 1, name: "Jon Dorian" },
      { id: 2, name: "Eliot Rid" },
      { id: 3, name: "Cristofer Tyorcalton" },
    ],
    message: "List of users received",
  });
};

import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register the user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
  // Login the user

  // Get the user's session

  // Log out the user

  // Delete the session
}

import { Express, Request, Response } from "express";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register the user

  // Login the user

  // Get the user's session

  // Log out the user

  // Delete the session
}

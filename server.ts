import express from "express";

import handler from "./api";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

app.use("/", (req, resp) => {
  handler(req as VercelRequest, resp as unknown as VercelResponse);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

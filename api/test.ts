import { VercelRequest } from "@vercel/node";

import { getEnv } from "@vercel/functions";

const env = getEnv();

export const GET = (req: VercelRequest) => {
  // return new Response(`Hello from ${process.env.VERCEL_REGION}`);
  return new Response(`ENV: ${JSON.stringify(getEnv())}`);
};

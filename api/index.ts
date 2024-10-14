import { get as httpGet } from "http";
import { get as httpsGet } from "https";

import type { VercelRequest, VercelResponse } from "@vercel/node";

// const PORT = process.env.PORT || 4000;

export default function (req: VercelRequest, resp: VercelResponse) {
  resp.setHeader("access-control-allow-origin", "*");
  try {
    if (req.url) {
      // console.log("url: ", req.url);
      // console.log("host: ", req.headers.host);

      const fetchedUrl = req.query["url"] as string;

      // console.log("URL: ", new URL(req.url, "http://" + req.headers.host));
      console.log({ fetchedUrl });

      if (!fetchedUrl) {
        resp.status(404).end("No param to fetch!!!");
        // resp.statusCode = 404;
        // resp.end("No param to fetch!!!");
      } else {
        const fetchedProtocol = new URL(fetchedUrl).protocol;
        const get = fetchedProtocol.startsWith("https") ? httpsGet : httpGet;
        get(fetchedUrl, (outResp) => {
          resp.writeHead(outResp.statusCode || 500, outResp.headers);
          outResp.pipe(resp);
        });
      }
    }
  } catch (err) {
    resp
      .status(500)
      .end(err instanceof Error ? err.message : "Internal server error!!!");
  }
}

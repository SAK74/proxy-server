import { createServer, get as httpGet } from "http";
import { get as httpsGet } from "https";

const PORT = process.env.PORT || 4000;

const server = createServer((req, resp) => {
  resp.setHeader("access-control-allow-origin", "*");
  try {
    if (req.url) {
      // console.log("url: ", req.url);
      // console.log("host: ", req.headers.host);

      const fetchedUrl = new URL(
        req.url,
        "http://" + req.headers.host
      ).searchParams.get("url");
      // console.log("URL: ", new URL(req.url, "http://" + req.headers.host));
      // console.log({ fetchedUrl });

      if (!fetchedUrl) {
        resp.statusCode = 404;
        resp.end("No param to fetch!!!");
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
    resp.statusCode = 500;
    resp.end(err instanceof Error ? err.message : "Internal server error!!!");
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

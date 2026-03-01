import type { HttpRoute } from "../router.js";

const route: HttpRoute = {
    method: "get",
    url: "/health",
    handler: (_request, response) => response.send("OK"),
}

export default route;
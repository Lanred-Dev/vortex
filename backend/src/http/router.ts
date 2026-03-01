import type { Request, Response } from "express";
import healthRoute from "./routes/health.js";
import { app } from "../index.js";

export interface HttpRoute {
    method: "get" | "post" | "put" | "delete";
    url: string;
    handler: (request: Request, response: Response) => void;
}

/**
 * Registers a route with the express app.
 *
 * @param route
 */
function registerRoute(route: HttpRoute) {
    switch (route.method) {
        case "get":
            app.get(route.url, route.handler);
            break;
        case "post":
            app.post(route.url, route.handler);
            break;
        case "put":
            app.put(route.url, route.handler);
            break;
        case "delete":
            app.delete(route.url, route.handler);
            break;
    }
}

registerRoute(healthRoute);

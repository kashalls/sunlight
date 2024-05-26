import { createRoute } from '@hono/zod-openapi';


export type RouteOptions = Parameters<typeof createRoute>[0];

export type RouteConfig = {
    route: ReturnType<typeof createRoute>;
};

export type Route<
    P extends string,
    R extends Omit<RouteOptions, 'path'> & {
        path: P;
    },
> = ReturnType<typeof createRoute<P, Omit<R, 'guard'>>>;

export const createRouteConfig = <
    P extends string,
    R extends Omit<RouteOptions, 'path'> & {
        path: P;
    },
>({
    ...routeConfig
}: R): Route<P, R> => {
    const initMiddleware = routeConfig.middleware ? (Array.isArray(routeConfig.middleware) ? routeConfig.middleware : [routeConfig.middleware]) : [];
    const middleware = [...initMiddleware];

    return createRoute({
        ...routeConfig,
        middleware,
    });
};
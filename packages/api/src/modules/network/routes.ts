import { createRouteConfig } from "../../lib/route-config";
import { errorResponses, successResponseWithDataSchema, successResponseWithErrorsSchema, successResponseWithPaginationSchema } from '../../lib/common-responses';
import { insertNetworkSchema, selectNetworkSchema } from '@sunlight/db/src/schema';
import { z } from "@hono/zod-openapi";
import { paginationQuerySchema } from "../../lib/common-schemas";

export const createNetworkRouteConfig = createRouteConfig({
    method: 'post',
    path: '/network',
    tags: ['ui'],
    summary: 'Creates a brand new network for the ray to connect to',
    request: {
        body: {
            required: true,
            content: {
                'application/json': {
                    schema: insertNetworkSchema.omit({ id: true })
                }
            }
        }
    },
    responses: {
        200: {
            description: '',
            content: {
                'application/json': {
                    schema: successResponseWithDataSchema(selectNetworkSchema)
                }
            }
        }
    }
})

export const getNetworksRouteConfig = createRouteConfig({
    method: 'get',
    path: '/networks',
    tags: ['ui', 'networks'],
    summary: 'Gets a list of networks',
    request: {
        query: paginationQuerySchema.merge(
            z.object({
                sort: z.enum(['id', 'ssid']).default('id').optional()
            })
        )
    },
    responses: {
        200: {
            description: 'Returns an array of networks',
            content: {
                'application/json': {
                    schema: successResponseWithPaginationSchema(selectNetworkSchema)
                }
            }
        },
        ...errorResponses
    }
})

export const getNetworksByIdRouteConfig = createRouteConfig({
    method: 'get',
    path: '/networks/{network}',
    tags: ['networks'],
    summary: 'Get network by id',
    request: {
        params: z.object({
            network: z.number()
        })
    },
    responses: {
        200: {
            description: 'The network object for the corresponding id',
            content: {
                'application/json': {
                    schema: successResponseWithDataSchema(selectNetworkSchema)
                }
            }
        },
        ...errorResponses
    }
})

export const deleteNetworksRouteConfig = createRouteConfig({
    method: 'delete',
    path: '/networks',
    tags: ['networks'],
    summary: 'Delete a network',
    request: {
        query: z.object({ network: z.number() })
    },
    responses: {
        200: {
            description: '',
            content: {
                'application/json': {
                    schema: successResponseWithErrorsSchema()
                }
            }
        },
        ...errorResponses
    }
})
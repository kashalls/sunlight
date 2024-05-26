import { createRouteConfig } from "../../lib/route-config";
import { errorResponses, successResponseWithDataSchema } from '../../lib/common-responses';
import { insertNetworkSchema, selectNetworkSchema } from '@sunlight/db/src/schema';

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
                    schema: insertNetworkSchema
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
        },
        ...errorResponses
    }
})
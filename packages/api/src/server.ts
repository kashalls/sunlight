// Hono modules
import docs from './lib/docs'
import middleware from './middleware'
import { errorResponse } from './lib/errors'

// Hono Instance
import { CustomHono } from './types/common'

// Hono Routes
import node from './v1/node'

const app = new CustomHono()

app.all('/', (c) => c.text('Project Sunlight - API Server\n\nGithub: https://github.com/kashalls/sunlight'))

// Load in middleware
app.route('*', middleware)

// Create docs
docs(app)

app.notFound((ctx) => {
  return errorResponse(ctx, 404, 'route_not_found', 'warn', { path: ctx.req.path })
})

app.onError((error, ctx) => {
  return errorResponse(ctx, 500, 'server_error', 'error', {}, error)
}) 

app.route('/v1/node', node)

export default app
export type AppType = typeof app


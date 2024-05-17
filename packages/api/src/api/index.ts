import { Hono } from 'hono'

import register from './v1/register'

const api = new Hono()

api.route('/register', register)

export default api
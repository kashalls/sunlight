import { Hono } from 'hono'
const api = new Hono()

import 
api.route('/register', register)
api.route('/tasks', tasks)

export default api
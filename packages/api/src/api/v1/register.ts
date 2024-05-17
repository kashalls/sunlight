import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const register = new Hono()

// POST /v1/register
register.post(
    '/',
    zValidator(
        'form',
        z.object({

        })
    ),
    (c) => {
        return c.text('hello')
    })

export default register
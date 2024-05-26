import { OpenAPIHono } from '@hono/zod-openapi';
import type { z } from 'zod';

import type { Schema } from 'hono';
import type { errorResponseSchema } from '../lib/common-schemas';

export type NonEmptyArray<T> = readonly [T, ...T[]];
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export type Env = {
    Variables: {};
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export class CustomHono<E extends Env = Env, S extends Schema = {}, BasePath extends string = '/'> extends OpenAPIHono<E, S, BasePath> { }
import type { Context } from 'hono';
import type { z } from 'zod';
import type { errorSchema } from './common-schemas';

import type { ClientErrorStatusCode, ServerErrorStatusCode } from 'hono/utils/http-status';

export type HttpErrorStatus = ClientErrorStatusCode | ServerErrorStatusCode;

export type Severity = 'debug' | 'info' | 'log' | 'warn' | 'error';

export type ErrorType = z.infer<typeof errorSchema> & {
    eventData?: EventData;
    name?: Error['name'];
};

export type EventData = {
    readonly [key: string]: number | string | boolean | null;
};

// Create error object and log it if needed
export const createError = (
    ctx: Context,
    status: HttpErrorStatus,
    type: string,
    severity: Severity = 'info',
    eventData?: EventData,
    err?: Error,
) => {
    const error: ErrorType = {
        type: type,
        status,
        severity,
        logId: ctx.get('logId'),
        path: ctx.req.path,
        method: ctx.req.method
    };

    if (err || ['warn', 'error'].includes(severity)) {
        const data = { ...error, eventData };
        console.error(err);
    }
    // Log significant events with additional data

    return error;
};

// Return error as http response
export const errorResponse = (
    ctx: Context,
    status: HttpErrorStatus,
    type: string,
    severity: Severity = 'info',
    eventData?: EventData,
    err?: Error,
) => {
    const error: ErrorType = createError(ctx, status, type, severity, eventData, err);

    // TODO: Review this assignment (as 400)
    return ctx.json({ success: false, error }, status as 400);
};
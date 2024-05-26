import { apiReference } from '@scalar/hono-api-reference';
import type { CustomHono } from '../types/common';

const openAPITags = [
  { name: 'auth', description: 'Authentication' },
  { name: 'users', description: 'Users' },
  { name: 'organizations', description: 'Organizations' },
  { name: 'general', description: 'General' },
  { name: 'public', description: 'Public' },
];

const docs = (app: CustomHono) => {
  app.doc31('/openapi.json', {
    info: {
      title: `Sunlight API`,
      version: 'v1',
      description: 'This is the api documentation for Sunlight.',
    },
    openapi: '3.1.0',
    tags: [
        { name: 'ray', description: 'Ray' },
        { name: 'ui', description: 'Frontend' }
    ],
    security: [{ cookieAuth: [] }],
  });

  app.get(
    '/docs',
    apiReference({
      spec: {
        url: 'openapi.json',
      },
    }),
  );
};

export default docs;
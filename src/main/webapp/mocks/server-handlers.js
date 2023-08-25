// src/mocks/serverHandlers.js
import { rest } from 'msw';
import { mockServerResponse } from './server-response';

export const serverHandlers = [
    rest.get('/servicesNS/nobody/-/mockGeneratedEndPointUrl', (req, res, ctx) =>
        res(ctx.json(mockServerResponse))
    ),
    rest.get('/servicesNS/nobody/-/splunk_ta_aws_aws_all_accounts', (req, res, ctx) =>
        res(ctx.status(200))
    ),
    rest.get('/servicesNS/nobody/-/data/indexes', (req, res, ctx) => res(ctx.status(200))),
];

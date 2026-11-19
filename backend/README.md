# Lead capture service

The backend now contains a working Node HTTP service, not just an architecture placeholder.

Run `node backend/server.mjs` from the repository root after building the frontend. Open http://127.0.0.1:8787/.

Accepted demo requests are flushed to private `backend/data/leads.jsonl`. This directory is ignored by Git and is never served as a static directory. A request reference is returned only after persistence. The service does not yet send email or update a CRM.

See [IMPLEMENTATION-HANDOFF.md](../IMPLEMENTATION-HANDOFF.md) for environment configuration, storage limitations, deployment requirements and pending business decisions.

Tests: `node --test backend/server.test.mjs`.

# Site API

Site API is a Cloudflare Worker backend for commander-scoped Elite Dangerous publishing data.

## What This API Stores

All resources are scoped by commander using this route prefix:

`/cmdr/:cmdr_name/...`

Supported resource families:

1. Ship transfers
2. Mission countdowns
3. System builds
4. Part transfers

Commander names are normalized to lowercase when stored and queried.

## Docs

After running locally:

1. Interactive docs: `http://127.0.0.1:8787/`
2. OpenAPI JSON: `http://127.0.0.1:8787/openapi.json`
3. Root project summary: `http://127.0.0.1:8787/meta`

## Route Overview

Each resource supports full CRUD under commander scope.

### Ship Transfers

1. `POST /cmdr/:cmdr_name/ship-transfers`
2. `GET /cmdr/:cmdr_name/ship-transfers`
3. `GET /cmdr/:cmdr_name/ship-transfers/:id`
4. `PUT /cmdr/:cmdr_name/ship-transfers/:id`
5. `DELETE /cmdr/:cmdr_name/ship-transfers/:id`

Payload fields:

1. `timestamp` (ISO-8601 datetime string)
2. `ship_type` (string)
3. `ship_type_localised` (string)
4. `transfer_time` (integer seconds)

### Mission Countdowns

1. `POST /cmdr/:cmdr_name/mission-countdowns`
2. `GET /cmdr/:cmdr_name/mission-countdowns`
3. `GET /cmdr/:cmdr_name/mission-countdowns/:id`
4. `PUT /cmdr/:cmdr_name/mission-countdowns/:id`
5. `DELETE /cmdr/:cmdr_name/mission-countdowns/:id`

Payload fields:

1. `localised_name` (string)
2. `destination_system` (string)
3. `expiry` (ISO-8601 datetime string)

### System Builds

1. `POST /cmdr/:cmdr_name/system-builds`
2. `GET /cmdr/:cmdr_name/system-builds`
3. `GET /cmdr/:cmdr_name/system-builds/:id`
4. `PUT /cmdr/:cmdr_name/system-builds/:id`
5. `DELETE /cmdr/:cmdr_name/system-builds/:id`

Payload fields:

1. `station_name` (string)
2. `construction_progress` (integer)
3. `resources_required` (array of strict objects)

`resources_required` item shape:

1. `name_localised` (string)
2. `required_amount` (integer)
3. `provided_amount` (integer)

### Part Transfers

1. `POST /cmdr/:cmdr_name/part-transfers`
2. `GET /cmdr/:cmdr_name/part-transfers`
3. `GET /cmdr/:cmdr_name/part-transfers/:id`
4. `PUT /cmdr/:cmdr_name/part-transfers/:id`
5. `DELETE /cmdr/:cmdr_name/part-transfers/:id`

Payload fields:

1. `timestamp` (ISO-8601 datetime string)
2. `stored_item_localised` (string)
3. `transfer_time` (integer seconds)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Apply local migrations:

```bash
npm run seedLocalDb
```

3. Start the worker locally:

```bash
npm run dev
```

## Testing

Run integration tests:

```bash
npm run test
```

Key test suites:

1. `tests/integration/commanderPublishing.test.ts`
2. `tests/integration/tasks.test.ts`
3. `tests/integration/dummyEndpoint.test.ts`

## Database Migrations

Relevant migration files:

1. `migrations/0001_add_tasks_table.sql`
2. `migrations/0002_add_commander_publish_tables.sql`

Apply remote migrations before deploy:

```bash
npx wrangler d1 migrations apply DB --remote
```

## Deploy

```bash
npm run deploy
```

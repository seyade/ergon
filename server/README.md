# Backend

### How to run the server

Prisma is use as the ORM.

During dev:

- `npm rund server:dev`

Other than dev:

- `npm run server:build`

You might see an error complaining about `id` when creating a new record about for the database: `prisma.project.create()`

Go in a DB tool of choice and use this query on the table that cause the error: `SELECT setval(pg_get_serial_sequence('"[DATA_MODEL_NAME_HERE]"', 'id'), coalesce(max(id)+1, 1), false) FROM "[DATA_MODEL_NAME_HERE]";`

This `id` issue will fixed in future.

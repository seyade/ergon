# Backend

### How to run the server

Prisma is use as the ORM.

During dev:

- `npm rund server:dev`

Other than dev:

- `npm run server:build`

You might see an error complaining about `id` when creating a new record in the database with Prisma `create`, e.g. something resembling `"Error creating task: \nInvalid \`prisma.project.create()\` invocation in\nC:\\ergon\\server\\src\\controllers\\task.controller.ts:45:40\n\n 42 } = req.body;\n 43 \n 44 try {\n→ 45 const response = await prisma.task.create({\n data: {\n title: \"Research on Dragon Balls nature\",\n description: \"Do some research on dragon balls to better understand them to build the radar.\",\n status: \"To Do\",\n tags: \"\",\n startDate: \"2024-10-25T01:00:00+01:00\",\n dueDate: \"2024-11-01T00:00:00Z\",\n points: undefined,\n projectId: undefined,\n + project: {\n + create: ProjectCreateWithoutTasksInput | ProjectUncheckedCreateWithoutTasksInput,\n + connectOrCreate: ProjectCreateOrConnectWithoutTasksInput,\n + connect: ProjectWhereUniqueInput\n + }\n }\n })\n\nArgument \`project\` is missing."`.

Go in a DB tool of choice and use this query on the table that causes the error. You only need to this once for each table, unless you create a new table or an entirely new database. Don't forget to replace `[DATA_MODEL_NAME_HERE]` with the table name:
`SELECT setval(pg_get_serial_sequence('"[DATA_MODEL_NAME_HERE]"', 'id'), coalesce(max(id)+1, 1), false) FROM "[DATA_MODEL_NAME_HERE]";`

This `id` issue will fixed in future so we won't need to the step above anymore.

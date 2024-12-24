# express-ts-pern-stack

## first config your sql database connection

```bash
npx prisma migrate dev
npx prisma db seed
```

## all available api routes

# API Endpoints Documentation

| Method | Endpoint                   | Description                            | Body                                                  |
| ------ | -------------------------- | -------------------------------------- | ----------------------------------------------------- |
| `GET`  | `/seed`                    | Seed Database                          | N/A                                                   |
| `GET`  | `/api/v1/users`            | Get all users                          | N/A                                                   |
| `GET`  | `/api/v1/users/:id`        | Get user by id                         | N/A                                                   |
| `POST` | `/api/v1/users`            | Create a new user                      | ```json                                               |
|        |                            |                                        | {                                                     |
|        |                            |                                        | "email": "john.doe@example.com",                      |
|        |                            |                                        | "name": "John Doe",                                   |
|        |                            |                                        | "password": "123456789"                               |
|        |                            |                                        | }                                                     |
| `GET`  | `/api/v1/users/:id/tasks`  | Get All Tasks Of Specific Users        | N/A                                                   |
| `GET`  | `/api/v1/tasks`            | Get all tasks                          | N/A                                                   |
| `POST` | `/api/v1/tasks`            | Create a new task                      | ```json                                               |
|        |                            |                                        | {                                                     |
|        |                            |                                        | "title": "Finish documentation",                      |
|        |                            |                                        | "description": "Complete the project documentation.", |
|        |                            |                                        | "userId": 1,                                          |
|        |                            |                                        | "listId": 2                                           |
|        |                            |                                        | }                                                     |
| `GET`  | `/api/v1/tasks/:id`        | Get One Task Based On Specific Task Id | N/A                                                   |
| `GET`  | `/api/v1/lists`            | Get all lists                          | N/A                                                   |
| `POST` | `/api/v1/lists`            | Create A New List                      | ```json                                               |
|        |                            |                                        | {                                                     |
|        |                            |                                        | "name": "Design Team",                                |
|        |                            |                                        | "userId": 1                                           |
|        |                            |                                        | }                                                     |
| `GET`  | `/api/v1/lists/:id/tasks`  | Return all tasks from specific list id | N/A                                                   |
| `GET`  | `/api/v1/transaction-test` | Test Transaction                       | N/A                                                   |

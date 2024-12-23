# express-ts-pern-stack

## first config your sql database connection

```bash
npx prisma migrate dev
npx prisma db seed
```

## all available api routes

| Method | Description                            | Body                                                  |
| ------ | -------------------------------------- | ----------------------------------------------------- |
| `GET`  | Seed Database                          | N/A                                                   |
| `GET`  | Get all users                          | N/A                                                   |
| `GET`  | Get user by id                         | N/A                                                   |
| `POST` | Create a new user                      | ```json                                               |
|        |                                        | {                                                     |
|        |                                        | "email": "john.doe@example.com",                      |
|        |                                        | "name": "John Doe",                                   |
|        |                                        | "password": "123456789"                               |
|        |                                        | }                                                     |
| `GET`  | Get All Tasks Of Specific Users        | N/A                                                   |
| `GET`  | Get all tasks                          | N/A                                                   |
| `POST` | Create a new task                      | ```json                                               |
|        |                                        | {                                                     |
|        |                                        | "title": "Finish documentation",                      |
|        |                                        | "description": "Complete the project documentation.", |
|        |                                        | "userId": 1,                                          |
|        |                                        | "listId": 2                                           |
|        |                                        | }                                                     |
| `GET`  | Get One Task Based On Specific Task Id | N/A                                                   |
| `GET`  | Get all lists                          | N/A                                                   |
| `POST` | Create A New List                      | ```json                                               |
|        |                                        | {                                                     |
|        |                                        | "name": "Design Team",                                |
|        |                                        | "userId": 1                                           |
|        |                                        | }                                                     |
| `GET`  | Return all tasks from specific list id | N/A                                                   |

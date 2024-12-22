// common error in prisma
export const QueryError = new Map<
  string,
  { message: string; httpStatus: number }
>([
  [
    "P1000",
    {
      message:
        "Authentication failed against database server at {database_host}, the provided database credentials for {database_user} are not valid. Please make sure to provide valid database credentials for the database server at {database_host}.",
      httpStatus: 401,
    },
  ],
  [
    "P1001",
    {
      message:
        "Can't reach database server at {database_host}:{database_port}. Please make sure your database server is running at {database_host}:{database_port}.",
      httpStatus: 503,
    },
  ],
  [
    "P1002",
    {
      message:
        "The database server at {database_host}:{database_port} was reached but timed out. Please try again. Please make sure your database server is running at {database_host}:{database_port}.",
      httpStatus: 504,
    },
  ],
  [
    "P1003",
    {
      message:
        "Database {database_file_name} does not exist at {database_file_path}",
      httpStatus: 404,
    },
  ],
  ["P1008", { message: "Operations timed out after {time}.", httpStatus: 504 }],
  [
    "P1009",
    {
      message:
        "Database {database_name} already exists on the database server at {database_host}:{database_port}.",
      httpStatus: 409,
    },
  ],
  [
    "P1010",
    {
      message:
        "User {database_user} was denied access on the database {database_name}.",
      httpStatus: 403,
    },
  ],
  [
    "P1011",
    { message: "Error opening a TLS connection: {message}.", httpStatus: 500 },
  ],
  [
    "P1012",
    {
      message:
        "Schema validation error. See Prisma ORM upgrade guide for resolving schema issues.",
      httpStatus: 400,
    },
  ],
  [
    "P1013",
    {
      message: "The provided database string is invalid. {details}.",
      httpStatus: 400,
    },
  ],
  [
    "P1014",
    {
      message: "The underlying {kind} for model {model} does not exist.",
      httpStatus: 404,
    },
  ],
  [
    "P1015",
    {
      message:
        "Your Prisma schema uses features unsupported by your database version. Database version: {database_version}. Errors: {errors}.",
      httpStatus: 400,
    },
  ],
  [
    "P1016",
    {
      message:
        "Your raw query had an incorrect number of parameters. Expected: {expected}, actual: {actual}.",
      httpStatus: 400,
    },
  ],
  ["P1017", { message: "Server has closed the connection.", httpStatus: 500 }],

  // Prisma Client (Query Engine) Errors
  [
    "P2000",
    {
      message:
        "The provided value for the column is too long for the column's type. Column: {column_name}.",
      httpStatus: 400,
    },
  ],
  [
    "P2001",
    {
      message:
        "The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist.",
      httpStatus: 404,
    },
  ],
  [
    "P2002",
    {
      message: "Unique constraint failed on the {constraint}.",
      httpStatus: 409,
    },
  ],
  [
    "P2003",
    {
      message: "Foreign key constraint failed on the field: {field_name}.",
      httpStatus: 409,
    },
  ],
  [
    "P2004",
    {
      message: "A constraint failed on the database: {database_error}.",
      httpStatus: 400,
    },
  ],
  [
    "P2005",
    {
      message:
        "The value {field_value} stored in the database for the field {field_name} is invalid for the field's type.",
      httpStatus: 400,
    },
  ],
  [
    "P2006",
    {
      message:
        "The provided value {field_value} for {model_name} field {field_name} is not valid.",
      httpStatus: 400,
    },
  ],
  [
    "P2007",
    { message: "Data validation error: {database_error}.", httpStatus: 400 },
  ],
  [
    "P2008",
    {
      message:
        "Failed to parse the query: {query_parsing_error} at {query_position}.",
      httpStatus: 400,
    },
  ],
  [
    "P2009",
    {
      message:
        "Failed to validate the query: {query_validation_error} at {query_position}.",
      httpStatus: 400,
    },
  ],
  [
    "P2010",
    {
      message: "Raw query failed. Code: {code}. Message: {message}.",
      httpStatus: 500,
    },
  ],
  [
    "P2011",
    {
      message: "Null constraint violation on the {constraint}.",
      httpStatus: 400,
    },
  ],
  [
    "P2012",
    { message: "Missing a required value at {path}.", httpStatus: 400 },
  ],
  [
    "P2013",
    {
      message:
        "Missing the required argument {argument_name} for field {field_name} on {object_name}.",
      httpStatus: 400,
    },
  ],
  [
    "P2014",
    {
      message:
        "The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models.",
      httpStatus: 400,
    },
  ],
  [
    "P2015",
    {
      message: "A related record could not be found. {details}.",
      httpStatus: 404,
    },
  ],
  [
    "P2016",
    { message: "Query interpretation error. {details}.", httpStatus: 400 },
  ],
  [
    "P2017",
    {
      message:
        "The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected.",
      httpStatus: 400,
    },
  ],
  [
    "P2018",
    {
      message: "The required connected records were not found. {details}.",
      httpStatus: 404,
    },
  ],
  ["P2019", { message: "Input error. {details}.", httpStatus: 400 }],
  [
    "P2020",
    { message: "Value out of range for the type. {details}.", httpStatus: 400 },
  ],
  [
    "P2021",
    {
      message: "The table {table} does not exist in the current database.",
      httpStatus: 404,
    },
  ],
  [
    "P2022",
    {
      message: "The column {column} does not exist in the current database.",
      httpStatus: 404,
    },
  ],
  [
    "P2023",
    { message: "Inconsistent column data: {message}.", httpStatus: 400 },
  ],
  [
    "P2024",
    {
      message:
        "Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit}).",
      httpStatus: 500,
    },
  ],
  [
    "P2025",
    {
      message:
        "An operation failed because it depends on one or more records that were required but not found. {cause}.",
      httpStatus: 404,
    },
  ],
  [
    "P2026",
    {
      message:
        "The current database provider doesn't support a feature that the query used: {feature}.",
      httpStatus: 400,
    },
  ],
  [
    "P2027",
    {
      message:
        "Multiple errors occurred on the database during query execution: {errors}.",
      httpStatus: 500,
    },
  ],
  ["P2028", { message: "Transaction API error: {error}.", httpStatus: 500 }],

  // Prisma Migrate Errors
  [
    "P3000",
    {
      message: "Failed to create database: {database_error}.",
      httpStatus: 500,
    },
  ],
  [
    "P3001",
    {
      message:
        "Migration possible with destructive changes and possible data loss: {migration_engine_destructive_details}.",
      httpStatus: 400,
    },
  ],
  [
    "P3002",
    {
      message: "The attempted migration was rolled back: {database_error}.",
      httpStatus: 400,
    },
  ],
  [
    "P3003",
    {
      message:
        "The format of migrations changed. See: https://pris.ly/d/migrate.",
      httpStatus: 400,
    },
  ],
]);

import helmet from "helmet";
import bodyParser from "body-parser";
import timeout from "connect-timeout";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandlingMiddleware from "./middleware/globalErrorHandlingMiddleware";
import routes from "./routes/route";

const app = express();

app.use(timeout("20s"));
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (!req.timedout) next();
});

app.use(
  bodyParser.json({
    inflate: true,
    limit: "5kb",
    strict: true,
    type: "application/json",
  })
);

app.use(
  bodyParser.urlencoded({
    inflate: true,
    extended: false,
    limit: "5kb",
    parameterLimit: 1,
    type: "application/x-www-form-urlencoded",
  })
);

app.use(helmet());

app.use("/api/v1", routes);

// route not found error message
app.all("*", (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `The route '${req.originalUrl}' does not exists`,
  });
  return;
});

// global not found error middleware
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    status: "error",
    message: "404 Error : Not found",
  });
  return;
});

app.use(globalErrorHandlingMiddleware);

export default app;

import express from "express";
import {v4 as uuidv4} from "uuid";

function requestLogger(req: express.Request, res: express.Response, next: express.NextFunction) {
  const correlationId = uuidv4();

  req.startTime = new Date().getTime();
  req.correlationId = correlationId;

  console.log(`${new Date(req.startTime).toISOString()} ${correlationId} START RequestId: ${correlationId}`);

  const requestInfo = {
    level: "INFO",
    message: req.url,
    timestamp: new Date(req.startTime).toISOString,
    extra: {
      httpMethod: req.method,
      body: req.body,
      pathParameters: req.params,
      queryStringParameters: req.query,
    }
  }
  console.log(`${new Date().toISOString()} ${correlationId} ${JSON.stringify(requestInfo)}`);

  res.setHeader('X-Correlation-ID', correlationId);

  next();
}

function errorLogger(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  const requestEndTime = new Date().getTime();
  const timeForLog = new Date(requestEndTime).toISOString();
  const responseTime = (requestEndTime - req.startTime!);

  const errorInfo = {
    level: "ERROR",
    message: "API",
    timestamp: new Date(requestEndTime).toISOString,
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
  }
  console.log(`${timeForLog} ${req.correlationId} ${JSON.stringify(errorInfo)}`);
  console.log(`${timeForLog} ${req.correlationId} END RequestId: ${req.correlationId}`);
  console.log(`${timeForLog} ${req.correlationId} REPORT RequestId: ${req.correlationId}\t Duration: ${responseTime}ms`);
  
  return res.status(400).json({ msg: "Shit happens" });
}

const loggers = {
  requestLogger,
  errorLogger
};

export default loggers;
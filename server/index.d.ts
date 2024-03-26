declare namespace Express {
  export interface Request {
     correlationId?: string
     startTime?: number
  }
}
import { Response } from "express";

export interface ErrorResponse {
  status: 'error';
  message: string;
  stack?: string;
  code?: number;
}

export const errorHandler = (
  err: Error,
  res: Response,
) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ status: 'error', message: err.message, code: 400 });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({ status: 'error', message: err.message, code: 404 });
  }

  return res.status(500).json({ status: 'error', message: err.message, code: 500 });
};
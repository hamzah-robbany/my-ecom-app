// types/api.ts

import { z } from 'zod';

export interface ErrorResponse {
  message: string;
  errors?: z.ZodIssue[]; // Definisikan properti errors
}

export interface SuccessResponse<T> {
  message: string;
  data: T;
}
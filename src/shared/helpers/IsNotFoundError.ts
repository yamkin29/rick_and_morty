import axios, { HttpStatusCode } from 'axios';

export const IsNotFoundError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === HttpStatusCode.NotFound;

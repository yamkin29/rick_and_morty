import axios from 'axios';

export const IsNotFoundError = (error: unknown) => axios.isAxiosError(error) && error.response?.status === 404;

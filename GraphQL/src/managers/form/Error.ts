import { FieldError } from 'react-hook-form';

export const isError = (error: FieldError | undefined) => (error ? 'error' : 'success');

// utils/token.utils.ts
import { randomBytes } from 'crypto';

export const generateResetToken = (): string => {
  return randomBytes(10).toString('hex');
};

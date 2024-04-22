import { userAgent } from 'next/server';
import { createContext } from 'react';

export type UserAgent = ReturnType<typeof userAgent>;
export const UserAgentContext = createContext<UserAgent | undefined>(undefined);

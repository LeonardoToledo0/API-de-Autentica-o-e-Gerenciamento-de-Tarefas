/* eslint-disable prettier/prettier */
import 'express';

declare module 'express' {
    export interface Request {
        user?: { userId: string; email?: string; username?: string };
    }
}

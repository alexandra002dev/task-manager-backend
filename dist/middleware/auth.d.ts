import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    userId?: number;
    userEmail?: string;
}
export declare const verifyToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};

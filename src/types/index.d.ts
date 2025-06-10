declare module "jsonwebtoken";
declare module "bcrypt";
declare module "cors";
declare module "express";

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
    PORT?: string;
    NODE_ENV?: "development" | "production" | "test";
  }
}

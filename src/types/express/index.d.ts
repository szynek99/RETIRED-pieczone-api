import express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      hash: string;
      imageAttached?: boolean;
      images: string[];
      clearFlavour?: boolean;
    }
  }
}

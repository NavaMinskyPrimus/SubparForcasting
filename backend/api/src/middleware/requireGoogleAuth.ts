import type { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

declare global {
  namespace Express {
    interface Request {
      auth?: {
        email: string;
        sub: string;
      };
    }
  }
}

export async function requireGoogleAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.header("authorization");
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing Authorization Bearer token" });
    }

    const idToken = header.slice("Bearer ".length).trim();

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const sub = payload?.sub;

    if (!email || !sub) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.auth = { email, sub };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

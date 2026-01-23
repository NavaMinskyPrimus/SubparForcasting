import type { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

declare global {
  namespace Express {
    interface Request {
      auth?: {
        sub: string;
      };
    }
  }
}

const TEST_USER = {
  sub: "sub2",
};

export async function requireGoogleAuth(req: Request, res: Response, next: NextFunction) {
  if (process.env.AUTH_BYPASS === "true" || process.env.NODE_ENV === "test") {
    const sub = req.header("x-test-sub");
    if (sub) {
      req.auth = {sub };
      return next();
    }else{
      req.auth = { sub: TEST_USER.sub };
      return next();
    }
  }

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
    const sub = payload?.sub;

    if ( !sub) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.auth = { sub };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

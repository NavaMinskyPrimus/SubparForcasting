import express, { Request, Response } from "express"
import dotenv from "dotenv";
import { pool } from './database/pool';

dotenv.config();
const port =  Number(process.env.PORT);
export const app=express()
import userRoutes from './api/src/routes/users';
app.use(express.json());

app.use("/api/users", userRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.get("/api/health/db", async (_req, res) => {
  try {
    const r = await pool.query("SELECT 1 AS ok");
    res.status(200).json({ status: "OK", db: r.rows[0] });
  } catch (err: any) {
    res.status(500).json({ status: "ERROR", error: err?.message ?? "DB error" });
  }
});

if (require.main === module) {
  const port = Number(process.env.PORT ?? 3001);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
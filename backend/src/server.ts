import express, { Request, Response } from 'express';

const app: express.Application = express();
const port: number = 3000;

app.get('/api/hello', (req: Request, res: Response): void => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(port, (): void => {
  console.log(`Backend listening at http://localhost:${port}`);
});

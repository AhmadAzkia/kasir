// server.ts
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  // Implementasi endpoint login
  server.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi login di sini (contoh sederhana, seharusnya dilakukan dengan aman)
    if (username === 'user' && password === 'password') {
      res.json({ success: true, message: 'Login berhasil' });
    } else {
      res.status(401).json({ success: false, message: 'Login gagal' });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
  
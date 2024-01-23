// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validasi login di sini (contoh sederhana, seharusnya dilakukan dengan aman)
    if (username === 'user' && password === 'password') {
      res.json({ success: true, message: 'Login berhasil' });
    } else {
      res.status(401).json({ success: false, message: 'Login gagal' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

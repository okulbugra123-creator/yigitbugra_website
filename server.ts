import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

const DATA_FILE = path.join(__dirname, 'projects_data.json');

// GET all 30 weekly projects from server storage (Accessible by any device)
app.get('/api/projects', (_req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ projects: parsed, source: 'server' });
      }
    }
  } catch (err) {
    console.error('Error reading projects_data.json:', err);
  }
  return res.json({ projects: null, source: 'empty' });
});

// POST to update weekly projects on server storage (Synced across all devices)
app.post('/api/projects', (req, res) => {
  try {
    const { projects } = req.body;
    if (Array.isArray(projects) && projects.length >= 1) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
      return res.json({ success: true, count: projects.length });
    }
    return res.status(400).json({ error: 'Haftalık proje dizisi bekleniyor.' });
  } catch (err) {
    console.error('Error writing projects_data.json:', err);
    return res.status(500).json({ error: 'Proje verileri kaydedilemedi.' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

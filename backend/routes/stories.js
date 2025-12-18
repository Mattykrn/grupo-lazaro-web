const express = require('express');
const db = require('../db');
const router = express.Router();

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'cambiame_en_produccion';

function checkAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || token !== ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// POST /api/stories -> crear historia (pendiente por defecto)
router.post('/', (req, res) => {
  const { nombre, email, tipoEM, historia } = req.body;
  // Aceptar tanto "añoDiagnostico" (frontend actual) como "anoDiagnostico"
  const anoDiagnostico = req.body.añoDiagnostico || req.body.anoDiagnostico || '';
  const stmt = db.prepare(`INSERT INTO stories (nombre,email,anoDiagnostico,tipoEM,historia,approved,createdAt) VALUES (?,?,?,?,?,0,?)`);
  const info = stmt.run(nombre || 'Anónimo', email || '', anoDiagnostico || '', tipoEM || '', historia || '', new Date().toISOString());
  const story = db.prepare('SELECT * FROM stories WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(story);
});

// GET /api/stories -> historias aprobadas
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM stories WHERE approved = 1 ORDER BY createdAt DESC').all();
  res.json(rows);
});

// GET /api/stories/all -> todas (admin)
router.get('/all', checkAdmin, (req, res) => {
  const rows = db.prepare('SELECT * FROM stories ORDER BY createdAt DESC').all();
  res.json(rows);
});

// PATCH /api/stories/:id/approve -> aprobar
router.patch('/:id/approve', checkAdmin, (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('UPDATE stories SET approved = 1 WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  const story = db.prepare('SELECT * FROM stories WHERE id = ?').get(id);
  res.json(story);
});

// DELETE /api/stories/:id -> borrar
router.delete('/:id', checkAdmin, (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('DELETE FROM stories WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

module.exports = router;

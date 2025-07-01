const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const pool = require('./src/models/db');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: 'claveSuperSecreta',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }
}));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

app.get('/proyectos', (req, res) => {
  pool.query('SELECT * FROM proyectos', (err, results) => {
    if (err) {
      console.error('Error consultando proyectos:', err.message);
      res.status(500).json({ error: 'Error en la consulta' });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});

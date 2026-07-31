// server.js - Portfolio backend (serves frontend + handles contact form)
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Serve all static files (index.html, style.css, script.js, images) from root
app.use(express.static(__dirname));

// ✅ Contact form API endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }
  console.log('\n📬 New contact form submission:');
  console.log(`  Name:    ${name}`);
  console.log(`  Email:   ${email}`);
  console.log(`  Message: ${message}\n`);
  res.json({ success: true, message: 'Message received!' });
});

// ✅ Fallback - serve index.html from root directory
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Portfolio running at http://localhost:${PORT}`);
});

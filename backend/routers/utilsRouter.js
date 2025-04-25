import express from 'express';
import { resolveShortLink } from '../utils/resolveShortLink.js';  // Correct relative path


const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'No URL provided.' });
  }

  try {
    const finalUrl = await resolveShortLink(url);
    res.status(200).json({ finalUrl });
  } catch (err) {
    res.status(500).json({ message: 'Error resolving short link', error: err.message });
  }
});

export default router;

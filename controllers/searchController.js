import { searchEntities } from '../services/searchService.js';

export const searchHandler = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    const result = await searchEntities(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

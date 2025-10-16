import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

let items = ['apple', 'banana', 'orange'];

// READ (GET)
app.get('/api/items', (req: Request, res: Response) => {
    res.json(items);
});

// CREATE (POST)
app.post('/api/items', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });
    items.push(name);
    res.status(201).json({ message: 'Added', items });
});

// UPDATE (PUT)
app.put('/api/items/:index', (req: Request, res: Response) => {
    const indexParam = req.params.index;
    if (!indexParam) return res.status(400).json({ error: 'Missing index' });
    
    const i = parseInt(indexParam);
    if (!items[i]) return res.status(404).json({ error: 'Not found' });
    
    const { name } = req.body;
    items[i] = name;
    res.json({ message: 'Updated', items });
});

// DELETE
app.delete('/api/items/:index', (req: Request, res: Response) => {
    const indexParam = req.params.index;
    if (!indexParam) return res.status(400).json({ error: 'Missing index' });
    
    const i = parseInt(indexParam);
    if (!items[i]) return res.status(404).json({ error: 'Not found' });
    
    items.splice(i, 1);
    res.json({ message: 'Deleted', items });
});

app.listen(3000, () => console.log('http://localhost:3000'));
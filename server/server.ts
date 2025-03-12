import express, { Request, Response } from 'express'
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => { res.send('Hello from the backend!'); });

// Start the server
app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`); });




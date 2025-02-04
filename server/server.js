import express from 'express'
import connectToMongoDb from './config/db.js';

const app = express();

const PORT = 8001;

app.use(express.json());

connectToMongoDb();

app.get('/', (req, res) => {
    res.send('Hello Rahad')
});

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
});
import express from 'express'
import connectToMongoDb from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import cors from 'cors';
const app = express();

const PORT = 8001;

app.use(express.json());
app.use(cors());
connectToMongoDb();

// routes section
app.use('/api/user/', userRoutes)
app.get('/', (req, res) => {
    res.send('Hello Rahad')
});

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
});
import express from 'express'
import connectToMongoDb from './config/db.js';
import userRoutes from './routes/userRoutes.js'
const app = express();

const PORT = 8001;

app.use(express.json());

connectToMongoDb();

// routes section
app.use('/api/user/', userRoutes)
app.get('/', (req, res) => {
    res.send('Hello Rahad')
});

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
});
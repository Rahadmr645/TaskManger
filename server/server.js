import express from 'express'
import connectToMongoDb from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import noteRoutes from './routes/noteRoutes.js'
import cors from 'cors';
const app = express();

const PORT = 8001;

app.use(express.json());
app.use(cors(
    {
        origin: ["https://task-manger-theta.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
));
connectToMongoDb();

// routes section
app.use('/api/user/', userRoutes);
app.use('/api/notes/',noteRoutes)
app.get('/', (req, res) => {
    res.send('Hello Rahad')
});

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
});
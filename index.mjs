import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import movieRoutes from './routes/movies.mjs';

dotenv.config();

const PORT = process.env.PORT || 3000;

const MONGO_URI = "mongodb+srv://hiwotkebede26:Rohisaze21182415!@mongopractice.1ulybhw.mongodb.net/?retryWrites=true&w=majority&appName=MongoPractice";

const app = express();

//Making sure the server is running correctly
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/movies', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//Setup Express Router and Mongoose Model:
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define a Mongoose model with a flexible Schema
const Movie = mongoose.model('Movie', new mongoose.Schema({}, { strict: false}));

//Create a new movie (POST / Movies):
router.post('/', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).send(newMovie);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Read all movies (GET /Movies)
router.get('/', async (req, res) => {
    try{
        const movies = await Movie.find({});
        res.send(movies);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Read a single movie by ID (GET /movies/):
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie) {
            return res.status(404).send();
        }
        res.send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Update a movie (PUT /movies/):
router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Delete a movie (DELETE /movies):
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Export the Router
export default router;
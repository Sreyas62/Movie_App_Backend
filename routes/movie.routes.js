const express = require('express');
const { MovieModel } = require('../models/MovieModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const movieRouter = express.Router();
const { authenticator } = require('../middlewares/authenticator');
movieRouter.use(authenticator);



//Read
movieRouter.get('/', async(req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        try{
            let data = await MovieModel.find({user:decoded.userId})
            res.send({
                data: data,
                message: 'Success',
                status: 1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }
    })
});



//Create
movieRouter.post('/create', async (req, res) => {
  try {
    // Create a new movie instance with the data from the request body
    const movieData = req.body;
    // Set the "user" field of the movie to the authenticated user's ID
    movieData.user = req.userId;

    const movie = new MovieModel(movieData);
    await movie.save();
    res.send({
      message: "Movie created",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});


//Update
movieRouter.patch('/', async (req, res) => {
    let {id} = req.headers
    try {
        await MovieModel.findByIdAndUpdate({_id:id}, req.body)
        res.send({
            message: "Movie updated",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})


//Delete
movieRouter.delete('/', async (req, res) => {
    let {id} = req.headers
    try {
        await MovieModel.findByIdAndDelete({_id:id})
        res.send({
            message: "Movie deleted",
            status: 1
        })  
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})


module.exports = {
  movieRouter,
};

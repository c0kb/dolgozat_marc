const express = require('express');
const app = express();
app.use(express.json());

let movies = [
    { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010, oscar: true },
    { id: 2, title: "The Matrix", director: "Lana Wachowski", year: 1999, oscar: true },
    { id: 3, title: "Interstellar", director: "Christopher Nolan", year: 2014, oscar: false }
];

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Film not found');
    res.json(movie);
});

app.post('/movies', (req, res) => {
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        oscar: req.body.oscar
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m .id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Film not found');

    movie.title = req.body.title || movie.title;
    movie.director = req.body.director || movie.director;
    movie.year = req.body.year || movie.year;
    movie.oscar = req.body.year || movie.year;

    res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).send('Film not found');

    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server running on https://localhost:3000');
});
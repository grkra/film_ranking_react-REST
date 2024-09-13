import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let films = [
    {
        id: 1,
        title: "Pan Tadeusz",
        score: 3,
        review: "Ramota",
    },
    {
        id: 2,
        title: "Drużyna A",
        score: 4,
        review: "Stare ale jare",
    },
    {
        id: 3,
        title: "Gwiezdny Pył",
        score: 5,
        review: "Kapitan Sheakspear is the best",
    },
];

let users = [
    {
        id: 1,
        username: "grzes",
        password: "123"
    },
    {
        id: 2,
        username: "qwe",
        password: "qwe"
    }
]

let lastFilmId = 3;
let lastUserId = 2;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const checkIfUsernameExist = users.findIndex(user => user.username === username);
    if (checkIfUsernameExist > -1) {
        res.status(400).json({ error: `Username: ${username} already registered` })
    } else {
        const newUser = {
            id: ++lastUserId,
            username: username,
            password: password
        }

        users.push(newUser);
        res.status(201).json(newUser);
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const checkIfUsernameExist = users.findIndex(user => user.username === username);
    if (checkIfUsernameExist > -1) {
        if (users[checkIfUsernameExist].password === password) {
            res.status(200).json({ user: users[checkIfUsernameExist] })
        } else {
            res.status(400).json({ error: `Incorrect password` })
        }
    } else {
        res.status(400).json({ error: `User not found` })
    }
});

app.get("/getUsers", (req, res) => {    //DO USUNIĘCIA!
    res.json(users);
});

app.get("/getFilms", (req, res) => {
    res.json(films);
});

app.post("/addFilm", (req, res) => {
    const newFilm = {
        id: ++lastFilmId,
        title: req.body.title,
        score: req.body.score,
        review: req.body.review,
    };

    films.push(newFilm);
    res.status(201).json(newFilm);
});

app.delete("/deleteFilm/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const indexOfDeletedFilm = films.findIndex(film => film.id === id);

    if (indexOfDeledFilm > -1) {
        films.splice(indexOfDeletedFilm, 1);
        res.sendStatus(200);
    } else {
        res.status(404).json({ error: `Film with id: ${id} not found` })
    }
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
})
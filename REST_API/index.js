import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import bcrypt from "bcrypt"

const app = express();
const port = 4000;

let films = [
    {
        id: 1,
        user: 1,
        title: "Pan Tadeusz",
        score: 3,
        review: "Ramota",
    },
    {
        id: 2,
        user: 2,
        title: "Drużyna A",
        score: 4,
        review: "Stare ale jare",
    },
    {
        id: 3,
        user: 1,
        title: "Gwiezdny Pył",
        score: 5,
        review: "Kapitan Sheakspear is the best",
    },
];

let users = [
    {
        id: 1,
        username: "grzes",
        password: "123",
        token: "token_grzes"
    },
    {
        id: 2,
        username: "qwe",
        password: "qwe",
        token: "token_qwe"
    }
]

let lastFilmId = 3;
let lastUserId = 2;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const checkIfUsernameExist = users.findIndex(user => user.username === username);
    if (checkIfUsernameExist > -1) {
        res.status(400).json({ error: `Can't register as ${username}, try different username` })
    } else {
        const newUser = {
            id: ++lastUserId,
            username: username,
            password: password,
            token: crypto.randomBytes(30).toString("hex"),
        }

        users.push(newUser);
        // res.status(201).json({ token: newUser.token });
        res.status(201).json({ message: "User registered" });
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const checkIfUsernameExist = users.findIndex(user => user.username === username);
    if (checkIfUsernameExist > -1) {
        if (users[checkIfUsernameExist].password === password) {
            res.status(200).json({ token: users[checkIfUsernameExist].token })
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

app.get("/getUsername", (req, res) => {
    const token = req.query.token;
    const checkIfUserExists = users.findIndex(user => user.token === token);
    if (checkIfUserExists > -1) {
        const username = users[checkIfUserExists].username;
        res.status(200).json({ username: username });
    } else {
        res.status(404).json({ error: 'Authorisation failed' });
    }
});

app.get("/getFilms", (req, res) => {
    const token = req.query.token;
    const checkIfUserExists = users.findIndex(user => user.token === token);
    if (checkIfUserExists > -1) {
        const userId = users[checkIfUserExists].id;
        const usersFilms = films.filter((film) => { return film.user === userId })
        res.status(200).json(usersFilms);
    } else {
        res.status(404).json({ error: 'Authorisation failed' });
    }
});

app.post("/addFilm", (req, res) => {
    const token = req.query.token;
    const checkIfUserExists = users.findIndex(user => user.token === token);
    if (checkIfUserExists > -1) {
        const newFilm = {
            id: ++lastFilmId,
            user: users[checkIfUserExists].id,
            title: req.body.title,
            score: req.body.score,
            review: req.body.review,
        };
        films.push(newFilm);
        res.status(201).send("Added film");
    } else {
        res.status(404).json({ error: 'Authorisation failed' });
    }
});

app.delete("/deleteFilm/:id", (req, res) => {
    const token = req.query.token;
    const checkIfUserExists = users.findIndex(user => user.token === token);
    if (checkIfUserExists > -1) {
        const id = parseInt(req.params.id);
        const indexOfDeletedFilm = films.findIndex(film => film.id === id && film.user === users[checkIfUserExists].id);

        if (indexOfDeletedFilm > -1) {
            films.splice(indexOfDeletedFilm, 1);
            res.status(200).send("Film deleted");
        } else {
            res.status(404).json({ error: `Film with id: ${id} not found` })
        }
    } else {
        res.status(404).json({ error: 'Authorisation failed' });
    }
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
})
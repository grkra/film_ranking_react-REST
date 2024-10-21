import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import bcrypt from "bcrypt"
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 4000;

const saltRounds = 10;  // number of times password will be hashed

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

db.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const checkIfUsernameExist = await db.query("SELECT * FROM users WHERE username = $1", [username]);

        if (checkIfUsernameExist.rows.length > 0) {
            res.status(400).json({ error: `Can't register as ${username}, try different username` })
        } else {
            bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
                if (error) {
                    console.log("Error when hashing password: " + error);
                    throw error;
                } else {
                    const result = await db.query("INSERT INTO users (username, password, token) VALUES ($1, $2, $3)", [username, hashedPassword, crypto.randomBytes(30).toString("hex")]);
                    res.status(201).json({ message: "User registered" });
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Couldn't register due to internal error, please try later` })
    }
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const checkIfUserNameExist = await db.query("SELECT * FROM users WHERE username = $1", [username]);

        if (checkIfUserNameExist.rows.length > 0) {
            const user = checkIfUserNameExist.rows[0];
            const storedPassword = user.password;

            bcrypt.compare(password, storedPassword, (error, result) => {
                if (error) {
                    console.log("Error when checking password: " + error);
                    throw error;
                } else {
                    if (result) {
                        res.status(200).json({ token: user.token });
                    } else {
                        res.status(400).json({ error: `Incorrect password` });
                    }
                }
            })
        } else {
            res.status(400).json({ error: `User not found` })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Couldn't log in due to internal error, please try later` })
    }
});

app.get("/getUsername", async (req, res) => {
    const token = req.query.token;

    try {
        const checkIfUserExists = await db.query("SELECT * FROM users WHERE token = $1", [token]);

        if (checkIfUserExists.rows.length > 0) {
            const user = checkIfUserExists.rows[0];
            const username = user.username;
            res.status(200).json({ username: username });
        } else {
            res.status(401).json({ error: 'Authorisation failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Couldn't authorize request due to internal error, please try later` })
    }
});

app.get("/getFilms", async (req, res) => {
    const token = req.query.token;
    try {
        const checkIfUserExists = await db.query("SELECT * FROM users WHERE token = $1", [token]);

        if (checkIfUserExists.rows.length > 0) {
            const user = checkIfUserExists.rows[0];
            const userId = user.id;

            const result = await db.query("SELECT * FROM films WHERE user_id = $1", [userId]);

            let usersFilms = [];
            result.rows.forEach((film) => usersFilms.push(film));

            if (usersFilms.length > 0) {
                res.status(200).json(usersFilms);
            } else {
                res.status(200).json([]);
            }

        } else {
            res.status(401).json({ error: 'Authorization failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Couldn't authorize request due to internal error, please try later` })
    }

});

app.post("/addFilm", async (req, res) => {
    const token = req.query.token;

    try {
        const checkIfUserExists = await db.query("SELECT * FROM users WHERE token = $1", [token]);

        if (checkIfUserExists.rows.length > 0) {
            const user = checkIfUserExists.rows[0];
            const userId = user.id;

            const result = await db.query("INSERT INTO films (user_id, title, score, review) VALUES ($1, $2, $3, $4)RETURNING *", [userId, req.body.title, req.body.score, req.body.review]);

            if (result.rows.longth < 1) {
                res.status(400).send("Couldn't add film");
            } else {
                res.status(201).send("Added film");
            }
        } else {
            res.status(401).json({ error: 'Authorization failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Couldn't authorize request due to internal error, please try later` })
    }

});

app.delete("/deleteFilm/:id", async (req, res) => {
    const token = req.query.token;

    try {
        const checkIfUserExists = await db.query("SELECT * FROM users WHERE token = $1", [token]);

        if (checkIfUserExists.rows.length > 0) {
            const deletedFilmId = parseInt(req.params.id);
            const user = checkIfUserExists.rows[0];
            const userId = user.id;

            const result = await db.query("DELETE FROM films WHERE id=$1 AND user_id=$2 RETURNING *", [deletedFilmId, userId]);

            if (result.rows.longth < 1) {
                res.status(400).send("Couldn't delete film");
            } else {
                res.status(200).send("Deleted film");
            }
        } else {
            res.status(404).json({ error: 'Authorisation failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Couldn't authorize request due to internal error, please try later` })
    }

});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
})
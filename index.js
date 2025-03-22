import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import {fileURLToPath} from "url";
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

let authorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordChecker (req, res, next) {
    if (req.body.password === "ILoveProgramming") {
        authorised = true;
        next();
    } else {
        authorised = false;
        next();
    }
}

app.use(passwordChecker);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
    if (authorised === true) {
        res.sendFile(__dirname + '/public/secret.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
});

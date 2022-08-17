import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import * as StoreController from "./src/api/StoreController";
import * as InformationController from "./src/api/InformationController";
import * as UserController from "./src/api/UserController";

const PORT = 3000;

async function startup() {

    await createConnection();
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.post('/store', StoreController.save);
    app.post('/information', InformationController.save);
    app.post('/user', UserController.save);

    app.get('/store', StoreController.getAll);
    app.get('/information', InformationController.getAll);
    app.get('/user', UserController.getAll);

    app.listen(PORT, () => {
        console.log("Aplicativo rodando na porta " + 3000);
    });
}

startup();
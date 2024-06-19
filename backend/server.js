import express from "express";
import cors from "cors"

import {mongoDB} from "./database/database.js";
import noteRoute from "./routes/Note.js";
import userRoute from "./routes/users.js";

//creates a new instance of an Express application
const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());

// route splitting
app.use("/api/v1/notes", noteRoute);
app.use("/api/v1/users", userRoute);


//connecting database
mongoDB();

//listen to the connections on the specified host and port
app.listen(port, () => {
    console.log(`server listen on ${port}`)
})
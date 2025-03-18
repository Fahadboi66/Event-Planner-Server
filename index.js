import express from "express";
import eventRouter from "./Routers/event.router.js";
const PORT = 8000;


const app = express();


app.use("/api/v1/events", eventRouter);


app.listen(PORT, () => {
    console.log(
        `Server is running on http://localhost:${PORT}`
    )
})
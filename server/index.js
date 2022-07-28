const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
var cors = require('cors');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const path = require('path')

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
connectDb();


app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// -------deployement------------

__dirname = path.resolve();
// var parentDir = path.dirname(__dirname);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"/frontend/build")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    });
}else{
    app.get("/", (req, res) => {
        res.send("hello users");
    });
}

// -------deployement------------

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started on port ${PORT}`)); 
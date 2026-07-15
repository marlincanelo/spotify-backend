const express = require("express")
const app = express()
const db = require("./db")
const cors = require("cors")
const {Playlist, Song} = require("./models")
const playlistRouter = require("./routes/playlists")
const songRouter = require("./routes/songs")
const PORT = process.env.PORT || 8081;

function logger(req, res, next) {
    console.log(req.method, req.url)
    next()
}
app.use(cors())
app.use(express.json())
app.use(logger)



app.use("/api/playlists", playlistRouter);
app.use("/api/songs", songRouter);


app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({error: "Not found"})
})

// sync models in database
db.sync() 
  .then(() => {
    console.log('DB is synced with our app')
    
    app.listen(PORT, () => { 
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((er) => {
    console.log('Failed to sync to the DB')
    console.log('Error', er)
  })





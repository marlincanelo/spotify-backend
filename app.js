const express = require("express")
const app = express()
const db = require("./db")
const {Playlist, Song} = require("./models")
const playlistRouter = require("./routes/playlists")


app.use(express.json())
app.use("/api/playlists", playlistRouter);


// app.get("/", (req, res) => {
//   res.json({ status: "ok" });
// });





// sync models in database
db.sync() 
  .then(() => {
    console.log('DB is synced with our app')
    
    app.listen(3000, () => { 
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((er) => {
    console.log('Failed to sync to the DB')
    console.log('Error', er)
  })



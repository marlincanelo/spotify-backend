const express = require("express");
const router = express.Router();
const { Playlist, Song } = require("../models");


// GET ALL PLAYLISTS
router.get("/", async (req, res) => {

  const playlists = await Playlist.findAll();
  console.log(playlists)
  res.json(playlists);
});


//PLAYLIST BY ID
router.get("/:id", async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id, {
    include: Song
  });
  if (!playlist) return res.status(404).json({ error: "Playlist not found" });
  res.json(playlist);
});


// CREATE ONE PLAYLIST
router.post("/", async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.status(201).json(playlist);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ error: err.errors[0].message });
    }
  }
});


// UPDATE ONE PLAYLIST
router.patch("/:id", async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);
  if (!playlist) return res.status(404).json({ error: "Playlist not found" });
  await playlist.update(req.body);
  res.json(playlist);
});


// DELETE ONE PLAYLIST
router.delete("/:id", async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);
  if (!playlist) return res.status(404).json({ error: "Playlist not found" });
  await playlist.destroy();
  res.sendStatus(204);
});


module.exports = router
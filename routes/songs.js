const express = require("express");
const router = express.Router();
const { Song } = require("../models");


router.get("/", async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
});

router.post("/", async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ error: err.errors[0].message });
    }
  }
});

// DELETE ONE PLAYLIST
router.delete("/:id", async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (!song) return res.status(404).json({ error: "Song not found" });
  await song.destroy();
  res.sendStatus(204);
});

module.exports = router
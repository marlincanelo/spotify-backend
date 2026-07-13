//DEClARE ASSOCIATIONS

const Playlist = require("./Playlist")
const Song = require("./Song")


Playlist.hasMany(Song)
Song.belongsTo(Playlist)


module.exports = {
    Playlist, Song
}
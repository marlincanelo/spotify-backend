// get some data inside the tables without making a request

const { Playlist, Song } = require("./models")
const db = require("./db")


async function seed() {
try {
    //if there data in database, remove it and refill with following

await db.sync({force: true})

const ayesha = await Playlist.create({
    name: "Ayesha Erotica Favorites",
    description: "Hyperpop Queen"
})


await Song.create({
    title: "Vacation Bible School",
    artist: "Ayesha Erotica",
    duration: 180,
    //goes inside playlist above
    PlaylistId: ayesha.id
})

await Song.create({
    title: "Literal Legend",
    artist: "Ayesha Erotica",
    duration: 170,
    PlaylistId: ayesha.id
})

console.log("seeded")

} catch(error) {
    console.error(error)
} finally {
    await db.close();
}



}


seed()
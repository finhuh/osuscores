const CONN_STRING = "mongodb+srv://osubackend:NQ1MZMcvL1AYWnXS@osucluster.9qusb.mongodb.net/osustats?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3001;
const SONGS_FOLDER = "C:\\Users\\senki\\AppData\\Local\\osu!\\Songs";

const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const BeatmapScraper = require('./src/beatmapScraper');
const DbClient = require('./src/dbClient');
const BeatmapParser = require('./src/beatmapParser');
const Fs = require('fs').promises;

const app = express();
const parser = new BeatmapParser();
const dbClient = new DbClient(CONN_STRING);
const scraper = new BeatmapScraper(SONGS_FOLDER, Fs, parser, dbClient);
    
MongoClient
    .connect(CONN_STRING, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('osustats');
        console.log('Connected to mongo atlas');
        const beatmaps = db.collection('beatmaps');

        app.get("/api", (req, res) => {
            beatmaps.insertOne({"hash": "123234235"});

            res.json({ message: "Hello from server! udpated" });
        });

        app.get("/api/scrape-songs-folder", async (req, res) => {
            let beatmapIds = await scraper.scrape();
            beatmaps.deleteMany();
            beatmaps.insertMany(beatmapIds);
            res.json(beatmapIds);
            // beatmaps
            //     .find()
            //     .toArray()
            //     .then(results => res.json(results));
        });
        
        app.listen(PORT, () => {
          console.log(`Server listening on ${PORT}`);
        });
    })
    .catch(console.error);

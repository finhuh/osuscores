const CONN_STRING = "mongodb+srv://osubackend:NQ1MZMcvL1AYWnXS@osucluster.9qusb.mongodb.net/osustats?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3001;
const SONGS_FOLDER = "C:\\Users\\senki\\AppData\\Local\\osu!\\Songs";
const PLAYER_IDS = ["20379051", "17839049", "5119319"];
const OSU_API = "https://osu.ppy.sh";

const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const BeatmapScraper = require('./src/beatmap-scraper');
const DbClient = require('./src/db-client');
const BeatmapParser = require('./src/beatmap-parser');
const Fs = require('fs').promises;
const Agenda = require('agenda');
const OsuClient = require("./src/osu-client");

const app = express();
const parser = new BeatmapParser();
const dbClient = new DbClient(CONN_STRING);
const scraper = new BeatmapScraper(SONGS_FOLDER, Fs, parser, dbClient);
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
const osuClient = new OsuClient(OSU_API);
    
MongoClient
    .connect(CONN_STRING, { useUnifiedTopology: true })
    .then(async client => {
        const db = client.db('osustats');
        console.log('Connected to mongo atlas');
        const beatmaps = db.collection('beatmaps');

        app.get("/api", async (req, res) => {
            let cursor = beatmaps.find().limit(10);
            res.json(await cursor.toArray());
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

        app.get("/api/add-scores", async (req, res) => {
            let beatmapIds = await scraper.scrape();
            beatmaps.deleteMany();
            beatmaps.insertMany(beatmapIds);
            res.json(beatmapIds);
            // beatmaps
            //     .find()
            //     .toArray()
            //     .then(results => res.json(results));
        });
        
        const agenda = new Agenda({ db: { address: CONN_STRING, options: { useNewUrlParser: true } } });
        agenda.define('fetch beatmap scores', async (job) => {
            // fetch first x beatmap ids from mongo
            let cursor = beatmaps.find().limit(1);

            while (await cursor.hasNext()){
                console.log(await cursor.next());
                await snooze(1000);
            }
        
            // for each beatmap make a call to osu api per user
        
            // if any scores found store in db
        });

        await agenda.start();
        await agenda.every('one minute', 'fetch beatmap scores');

        app.listen(PORT, () => {
          console.log(`Server listening on ${PORT}`);
        });

        console.log("calling osu api");
        let score = await osuClient.getScore(PLAYER_IDS[0], 556622);

        console.log("response from api");
        console.log(score);

    }).catch(console.error);



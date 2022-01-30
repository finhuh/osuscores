const express = require("express");
const mongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 3001;
const connectionString = "mongodb+srv://osubackend:NQ1MZMcvL1AYWnXS@osucluster.9qusb.mongodb.net/osustats?retryWrites=true&w=majority";
const app = express();

mongoClient
    .connect(connectionString, {useUnifiedTopology: true })
    .then(client => {
        const db = client.db('osustats');
        console.log('Connected to mongo atlas');
        const beatmaps = db.collection('beatmaps');

        app.get("/api", (req, res) => {
            beatmaps.insertOne({"hash": "123234235"});

            res.json({ message: "Hello from server! udpated" });
        });

        app.get("/api2", (req, res) => {
            beatmaps
                .find()
                .toArray()
                .then(results => res.json(results));
        });
        
        app.listen(PORT, () => {
          console.log(`Server listening on ${PORT}`);
        });
    })
    .catch(console.error);

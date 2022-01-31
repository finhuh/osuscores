module.exports = class BeatmapScraper {
    constructor(songsFolder, fs, parser, dbClient){
        this.songsFolder = songsFolder;
        this.fs = fs;
        this.parser = parser;
        this.dbClient = dbClient;
    }

    async scrape(){
        let songs = await this.fs.readdir(this.songsFolder);
        let scrapedIds = new Set();

        for(let song of songs){
            let beatmapFiles = await this.fs.readdir(`${this.songsFolder}/${song}`);

            for(let beatmapFile of beatmapFiles){
                if (beatmapFile.split('.').pop() === 'osu'){
                    // console.log(beatmapFile);
                    let beatmap = await this.fs.readFile(`${this.songsFolder}/${song}/${beatmapFile}`, {encoding: 'utf-8'});
                    let id = this.parser.parseId(beatmap);
                    if (!id) continue;

                    scrapedIds.add(id);
                }
            }
        }

        // console.log(scrapedIds);
        return [...scrapedIds].map(id => ({_id: id}));
    }
}
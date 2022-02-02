module.exports = class BeatmapParser {
    parseId(beatmap) {
        const beatmapRegex = /BeatmapID:[0-9]*/;
        // const beatmapSetRegex = /BeatmapSetID:[0-9]*/;

        let mapId = beatmapRegex.exec(beatmap);
        // let mapSetId = beatmapSetRegex.exec(beatmap);
        
        if (!mapId)  return null;

        let parsedMapId = mapId[0].split(':').pop();
        // let parsedSetId = mapSetId[0].split(':').pop();
        if (!parsedMapId || parsedMapId === "0") return null;

        return parsedMapId;
        // return { _id: mapId[0].split(':').pop(), setId: mapSetId[0].split(':').pop() };
    }
};
module.exports = class DbClient {
    constructor(connectionString){
        this.connectionString = connectionString;
    }

    save(){
        const db = client.db('osustats');
        console.log('Connected to mongo atlas');
        const beatmaps = db.collection('beatmaps');
    }
}
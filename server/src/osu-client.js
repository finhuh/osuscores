const request = require("./await-request");
const { ClientCredentials } = require('simple-oauth2');
const config = {
    client: {
      id: "12412",
      secret: ""
    },
    auth: {
      tokenHost: "https://osu.ppy.sh"
    }
  };


module.exports = class OsuClient {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    async getScore(userId, beatmapId){
        if (!this.token)
            this.token = await this.getToken();

        const url = `${this.baseUrl}/api/v2/beatmaps/${beatmapId}/scores/users/${userId}`;
        let response = await request({ url: url, auth: { "bearer": this.token }});

        if (response.statusCode === 200) return response.body;

        if (response.statusCode === 401) {
            this.token = await this.getToken();
            
            response = await request({ url: url, auth: { "bearer": this.token }});

            if (response.statusCode === 200) return response.body;
        }

        return null;
    }

    async getToken(){
        const client = new ClientCredentials(config);
        const tokenParams = {
            scope: "public"
        };

        try {
            return (await client.getToken(tokenParams)).token.access_token;
        } catch (error){
            console.log("Failed to get acccess token", error.message);
            return null;
        }


        // let response = await request({
        //     url: `${this.baseUrl}/oauth/token`,
        //     method: "POST",
        //     form: {
        //         "grant_type": "client_credentials",
        //         "client_id": "12412",
        //         "client_secret": "QT6kdxM7qnXZf1OHHkaokniIGofxav7IFVk4vuvX",
        //         "scope": "public"
        //     }
        // });

        // console.log(response.body.access_token);
        // return response.body;
    }
};
const db = require("../libs/sequelize.lib");
const ExecuteRawQuery = db.sequelize;
const { uuid } = require('uuidv4');

const RTMPmodule = () => { }

RTMPmodule.registerStart = async (streamKey) => {
    try {
        const query = `
            SELECT user_id FROM stream_keys WHERE stream_key = $1 AND delete_time IS NULL
        `

        const resp = await ExecuteRawQuery.query(query, {
            bind: [streamKey],
        });

        if (resp[0].length <= 0) throw new Error("Invalid stream key");
        const user_id = resp[0][0].user_id;

        const query_insert = `
            INSERT INTO live_streams (live_id,user_id,start_transmission,end_transmission) 
            VALUES ($1,$2,$3,$4); 
        `

        await ExecuteRawQuery.query(query_insert, {
            bind: [uuid(), user_id, (new Date()).toISOString(), null],
        });

    } catch (error) {
        console.error("ERROR REGISTER START LIVE")
        console.error(error)
    }
}

RTMPmodule.registerEnd = async (streamKey) => {
    try {
        const query = `
            SELECT user_id FROM stream_keys WHERE stream_key = $1 AND delete_time IS NULL
        `

        const resp = await ExecuteRawQuery.query(query, {
            bind: [streamKey],
        });

        if (resp[0].length <= 0) throw new Error("Invalid stream key");
        const user_id = resp[0][0].user_id;

        const query_update = `
            UPDATE  live_streams SET end_transmission = $1 WHERE user_id = $2 AND end_transmission IS NULL;
        `

        await ExecuteRawQuery.query(query_update, {
            bind: [(new Date()).toISOString(), user_id],
        });

    } catch (error) {
        console.error("ERROR REGISTER END LIVE")
        console.error(error)
    }
}


module.exports = RTMPmodule
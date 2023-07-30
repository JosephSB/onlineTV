const { uuid } = require('uuidv4');
const db = require("../libs/sequelize.lib");
const ExecuteRawQuery = db.sequelize;
const StreamController = () => { }

StreamController.Start = async (req, res) => {
    try {
        const user = req.user;

        const query = `
            SELECT stream_key
            FROM stream_keys
            WHERE user_id = $1 AND delete_time IS NULL;
        `

        const resp = await ExecuteRawQuery.query(query, {
            bind: [user.user_id],
        });

        let tempStreamKey = null;

        if (resp[0].length <= 0) {
            const query_insert = `
                INSERT INTO stream_keys (stream_key,user_id) 
                VALUES ($1,$2); 
            `
            tempStreamKey = uuid();
            await ExecuteRawQuery.query(query_insert, {
                bind: [tempStreamKey, user.user_id],
            });
        }

        const data = resp[0][0];

        res.status(200).send({
            message: `stream credentials`,
            stream_key: tempStreamKey ? tempStreamKey : data.stream_key
        })
    } catch (error) {
        console.error(error)
        res.status(404).send({
            message: "error"
        })
    }
}

StreamController.ListLives = async (req, res) => {
    try {
        const query = `
            SELECT 
                ls.live_id, 
                ls.start_transmission,
                u.fullname
            FROM live_streams ls
            INNER JOIN users u ON (u.user_id = ls.user_id)
            WHERE end_transmission IS NULL;
        `

        const resp = await ExecuteRawQuery.query(query);

        const data = resp[0][0];

        res.status(200).send({
            message: `list active streams`,
            data: data || []
        })
    } catch (error) {
        console.error(error)
        res.status(404).send({
            message: "error"
        })
    }
}

module.exports = StreamController
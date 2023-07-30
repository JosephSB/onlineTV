const config = require('./config');
const NodeMediaServer = require('node-media-server');
const RTMPmodule = require('./modules/RTMP.modules');

const RTMPconfig = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: config.RTMP.PORT,
        mediaroot: './media',
        allow_origin: '*',
    },
    auth: {
        api: true,
        api_user: config.RTMP.API.pass,
        api_pass: config.RTMP.API.user,
    },
    trans: {
        ffmpeg: config.ffmpeg,
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                hlsKeep: true, // to prevent hls file delete after end the stream
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
                dashKeep: true // to prevent dash file delete after end the stream
            }
        ]
    }

}

const nms = new NodeMediaServer(RTMPconfig)

nms.on('prePublish', async (id, StreamPath, args) => {
    try {
        const [empy, app, streamKey] = StreamPath.split('/');
        RTMPmodule.registerStart(streamKey)
    } catch (error) {
        console.error('Failed to register start transmission:', error);
    }
});

nms.on('donePublish', (id, StreamPath, args) => {
    try {
        const [empy, app, streamKey] = StreamPath.split('/');
        RTMPmodule.registerEnd(streamKey)
    } catch (error) {
        console.error('Failed to register start transmission:', error);
    }
});

module.exports = nms
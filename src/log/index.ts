import bunyan = require('bunyan');
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * bunyan logger engine
 */

let logger;
if(process.env.ES_URL) {
    const Elasticsearch = require('bunyan-elasticsearch')
    const esStream = new Elasticsearch({
        indexPattern: '[logs-pixsy-api-]YYYY.MM.DD',
        type: 'logs',
        host: process.env.ES_URL
    });
    esStream.on('error', (err: any) => {
        console.log('Elasticsearch Stream Error:', err.stack);
    });
    
    logger = bunyan.createLogger({
        name: 'pixsy-api',
        streams: [
            { stream: esStream }
        ],
        serializers: bunyan.stdSerializers,
        env: process.env.ENV
    });
} else {
    logger = bunyan.createLogger({
        name : 'pixsy-api',
        level : 'debug'
    })
}
export const log = logger;
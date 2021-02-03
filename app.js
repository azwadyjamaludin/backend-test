let log4js = require('log4js');
let express = require('express');
let cors = require('cors');
let http = require('http')
let bodyParser = require('body-parser');
let dotenv = require('dotenv');

let logger = log4js.getLogger('server');
let app = express();
let commentsAPI = require('./routes/api/comments')
let postsAPI = require('./routes/api/posts')
let COMMENT_API = '/api/comments'
let POST_API = '/api/posts'

const host = process.env.APPREST_HOST || 'localhost';
const port = process.env.APPREST_PORT || 3000;

async function main() {
  dotenv.config();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cors());

  //API
  app.use(COMMENT_API, commentsAPI)
  app.use(POST_API,postsAPI)

  app.use("/", (req, res) => {
    res.json({
      message: "Welcome to backend-test."
    });
  });

  const cb = () => {
    logger.info('---------------------------------------------------------------------------');
    logger.info('****************** BACKEND-TEST APPLICATION SERVER STARTED ************************');
    logger.info('******************   http://%s:%s   ********************',
        host,
        port
    );
    logger.info('---------------------------------------------------------------------------');
  };

  let server = http.createServer(app).listen(port, cb);
  server.timeout = 240000;

}

// Running main server
(async () => {
  await main();
  logger.info('Ready to serve ...');
})().catch(err => {
  logger.info('error occurred in main server!');
  logger.info(err.message);
});

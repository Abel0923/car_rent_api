const express= require('express');
const helmet= require('helmet');
const bodyParser = require('body-parser');
const cors= require('cors');

function ExpressServerConfig({
  ConfigReq,
  BodyParserReq,
  CorsReq,
}) {
  const expressApp = express();
  const expressRouter = express.Router();

  // express server starter function
  function startServer() {
    expressApp.use(helmet());
    expressApp.use(cors());
    expressApp.use(logExecutionTime);

    expressApp.use(bodyParser.json({ limit: BodyParserReq?.limit || '50mb' }));
    expressApp.use(
      bodyParser.urlencoded({
        limit: BodyParserReq?.limit || '50mb',
        extended: BodyParserReq?.extended || true,
        parameterLimit: BodyParserReq?.parameterLimit || 5000,
      })
    );
    server = expressApp.listen(ConfigReq.PORT, () => {
      console.log(
        'Express server listening on %d, in %s mode',
        ConfigReq.PORT,
        expressApp.get('env')
      );
    });

    return { expressApp, server, expressRouter };
  }

  function stopServer() {
    server ? server.close : 'Already Stopped';
  }

  return { startServer, stopServer };
}

function logExecutionTime(req, res, next) {
    // Get the start time before it hits the route
    const startHrTime = process.hrtime.bigint();
    // Finish is emitted when the response is sent
    res.on("finish", () => {
        // Get the end time
        const endHrTime = process.hrtime.bigint();
        // Calculate the time in ms and log it
        const elapsedTimeInMs = Number(endHrTime - startHrTime) / 1000000.0;
        console.log(req.method + " " + req.originalUrl + " " + elapsedTimeInMs);
    });

    next();
}


module.exports = { ExpressServerConfig };

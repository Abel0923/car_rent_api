require("dotenv").config()
const { ExpressServerConfig } = require("./configs/express.server");
const { MongodbConnection } = require("./configs/mongodb");
const {routes} = require("./server/routes/index");
const port = process.env.PORT || 3001;

const { expressApp, expressRouter } = ExpressServerConfig({
  ConfigReq: { PORT: port },
}).startServer();

MongodbConnection({
  config: {
    mongo: { uri: process.env.MONGODB_URI, dbName: process.env.MONGODB_NAME },
  },
}).localMongodb();


expressApp.use('/api/v1', routes({ expressApp, expressRouter }));
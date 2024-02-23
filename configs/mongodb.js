const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongooseHidden = require('mongoose-hidden');

// mognodb connection function
function MongodbConnection({ config }) {
  mongoose.plugin(
    mongooseHidden({
      defaultHidden: {
        _id: false,
        password: true,
        pin: true,
        __v: true,
      },
    })
  );

  function localMongodb() {
    mongoose
      .connect(config.mongo.uri, {
        useNewUrlParser: true,
      })
      .then({}, (err) => {
        console.info('Mongodb error', err);
      })
      .catch((err) => {
        console.log('ERROR:', err);
      });
  }

  // disconnect with mongodb
  function disconnectToMongo() {
    mongoose.connection.on('connected', () => {
      mongoose.disconnect();
      console.info('MongoDB is Disconnected!');
    });
  }

  mongoose.connection.on('connected', (data) => {
    console.info('Connected to MongoDB!');
  });

  mongoose.connection.on('reconnected', () => {
    console.info('MongoDB reconnected!');
  });

  mongoose.connection.on('error', (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });

  return {
    localMongodb,
    disconnectToMongo,
  };
}

module.exports = { MongodbConnection }
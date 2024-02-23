
const { CarRouter } = require('./car.routes');


function routes({  expressRouter }) {
  
  // use /car - used to group the routes 
  // params: express Router, and express app passed from the express server
  // parent express.server.js
  expressRouter.use('/car', CarRouter(expressRouter))

  return expressRouter;
}

module.exports = { routes }
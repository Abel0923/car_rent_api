const { CreateCar, UpdateCar, AllCars } = require('../controllers/car.controller');
const {ReqMiddleware} = require('../middleware/adapter.middleware');

function CarRouter(router) {

    // // Init counters for add and update API calls
    // let createApiCount = 0;
    // let updateApiCount = 0;

    // // Middleware to count API calls
    // router.use((req, res, next) => {
    //     if (req.path === '/create') {
    //       createApiCount++;
    //     } else if (req.path === '/update') {
    //         updateApiCount++;
    //     }
    //     next();
    // });

  // ReqMiddleware is used for structure the user request
  router.post('/all', ReqMiddleware(AllCars));
  router.post('/update', ReqMiddleware(UpdateCar));
  router.post('/create', ReqMiddleware(CreateCar));

  // router.get('/count', (req, res) => {
  //   res.send(`API calls /add called : ${createApiCount} times. /n /update called: ${updateApiCount} times.`);
  // });
  
  return router;
}

module.exports = { CarRouter }
const { reject, resolve } = require("bluebird");
const CarDal = require("../dal/car.dal")

async function CreateCar (data) {
    console.log("--- Create a Car ---")
    try {
      const { name, model, quantity, user } = data.body;
        console.log(data.body)
      if(!name || !model || !quantity || !user){
        throw ({msg: "Invalid Request!"})
      }

      // Check if the car is already registered
      const existingCar = await CarDal.findOne({ name, model });
      if (existingCar) {
        throw ({msg: "Car Already Exists!"})
      }
  
      // Create a new car
      const newCar = await CarDal.create({name, model, quantity, user})
      if(!newCar){
        throw ({msg: "Car is not registered "})
      }
  
      return resolve({type: 'SUCCESS', status: 200, data: newCar})
    } catch (error) {
      console.error("Error >> ",error);
      return reject({type: 'ERROR', status: 500, error: 'Internal Server Error.'})
    }
        
  }

  async function UpdateCar (data) {
    console.log("--- Update a Car ---")
    try {
      const { id, name, model, quantity, user } = data.body;
  
      if(!name || !model || !quantity || !user){
        throw ({msg: "Invalid Request!"})
      }

      console.log(data.body)
      const carData = await CarDal.updateOne({ _id: id }, {name, model, quantity });
      if (!carData) {
        throw ({msg: "Car does not Exists!"})
      }
  
      return resolve({type: 'SUCCESS', status: 200, data: carData})
    } catch (error) {
      console.error("Error >> ",error);
      return reject({type: 'ERROR', status: 500, error: 'Internal Server Error.'})
    }
        
  }

  async function AllCars (data) {
    console.log("--- all Cars ---")
    try { 

      const carData = await CarDal.find({});
      if (!carData || carData.length == 0) {
        throw ({msg: "No Car"})
      }
  
      return resolve({type: 'SUCCESS', status: 200, data: carData})
    } catch (error) {
      console.error("Error >> ",error);
      return reject({type: 'ERROR', status: 500, error: 'Internal Server Error.'})
    }
        
  }
  module.exports = { CreateCar, UpdateCar, AllCars}
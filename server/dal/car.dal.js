'use strict';

const CarModel = require("../models/Car");


const  create = (data) => new CarModel(data).save();

const  find = (query, project) =>
  CarModel.find(query, project);

const  findOne = (query, project) =>
  CarModel.findOne(query, project);

const  findALL = (query, project, limit) =>
  CarModel.find(query, project).limit(limit);

const  findById = (query, project) => CarModel.findById(query);

const  updateOne = (query, data) =>
  CarModel.findOneAndUpdate(query, data, {
    new: true,
    useFindAndModify: false,
  });

const  findPnrByHistoryArray = (
  query,
  project,
  limit,
  sort,
  skip
) => CarModel.find(query, project).sort(sort).skip(skip).limit(limit);

const  countDocument = (query) => CarModel.countDocuments(query);

module.exports = { create, findOne, updateOne, findById,find }
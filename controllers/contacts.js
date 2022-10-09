const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('courtneyDatabase').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.body.id);
  const result = await mongodb
    .getDb()
    .db('courtneyDatabase')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  try {
    const contactObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db('courtneyDatabase').collection('contacts').insertOne(contactObj);
  
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch(err) {
    res.status(500).json(err);
  }
}

const updateContact = async (req, res) => {
  try {
    const contactObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
  
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('courtneyDatabase').collection('contacts').replaceOne({_id: userId}, contactObj);
  
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).send(response.error);
    }
  } catch(err) {
    res.status(500).json(err);
  }
}

const deleteContact = async (req, res) => {
  try {
  const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('courtneyDatabase').collection('contacts').deleteOne({_id: userId});
  
    if (response.deletedCount > 0){
      res.status(200).send();
    } else {
      res.status(500).send(response.error);
    }
  } catch(err) {
    res.status(500).json(err);
  }
}

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
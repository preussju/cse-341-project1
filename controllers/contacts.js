const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => { 
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => { 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

const getContactById = async (req, res) => { 
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
    result.toArray().then((contacts) => { 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
        //#swagger.tags=['Users']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (result.acknowledged > 0) {
        res.status(204).send();
    } else { 
    res.status(500).json(result.error || "Some error ocurred while creating the user.")
    }
};

const updateContact = async (req, res) => {
        //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId },contact);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else { 
    res.status(500).json(result.error || "Some error ocurred while updating the user.")
    }
};

const deleteContact = async (req, res) => {
        //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else { 
    res.status(500).json(result.error || "Some error ocurred while updating the user.")
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};  
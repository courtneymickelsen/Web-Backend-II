const routes = require('express').Router();
const { getAll, getSingle, createContact, updateContact, deleteContact } = require('../controllers/contacts');

routes.get('/', getAll);
routes.get('/:id', getSingle);
routes.post('/', createContact);
routes.put('/:id', updateContact);
routes.delete('/:id', deleteContact);

module.exports = routes;
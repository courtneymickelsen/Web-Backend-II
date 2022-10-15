const routes = require('express').Router();
const contactsRoutes = require('./contacts');
const { show } = require('../controllers/assignment1');

routes.get('/', show);
routes.use('/contacts', contactsRoutes);

module.exports = routes;
/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /check':{
    controller: 'UsersController',
    action: 'check'
  },
  'POST /signup':{
    controller: 'UsersController',
    action: 'signup'
  },
  'POST /signin': {
    controller: 'UsersController',
    action: 'login'
  },
  'GET /notes':{
    controller: 'NotesController',
    action: 'getAll'
  },
  'PUT /notes':{
    controller: 'NotesController',
    action: 'addNote'
  },
  'PATCH /notes/:id':{
    controller: 'NotesController',
    action: 'updateNote'
  },
  'DELETE /notes/:id':{
    controller: 'NotesController',
    action: 'deleteNote'
  }
};

/**
 * NoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let jwToken = require('../services/jwToken');
module.exports = {
  'addNote': async function (req, res){
    let {content} = req.body;
    let token = req.headers['x-access-token'];
    let decoded;
    jwToken.verify(token, (err, res) => {
      if(err){
        console.error(err);
      }
      if(res) {
        decoded = res;
      }
    });
    //console.log(sails.models.notes);
    try {
      let note = await sails.models.notes.create({content: content, userId: decoded.data}).fetch();
      console.log(note);
      //console.log(note.ops[0]);
      res.status(201).json({
        error: null,
        note
      });
    } catch (error) {
      console.error(error);
    }
  },

  'getAll': async function (req, res){
    let token = req.headers['x-access-token'];
    let decoded;
    jwToken.verify(token, (err, res) => {
      if(err){
        console.error(err);
      }
      if(res) {
        decoded = res;
      }
    });
    try {
      //console.log(await Notes.findOne());
      let notes = await sails.models.notes.find({userId:decoded.data}).sort([{ createdAt: 'DESC' },]);
      console.log(notes);
      res.status(200).json({
        error: null,
        notes
      });
    } catch (error) {
      console.error(error);
      res.status(403).json({
        error: error
      });
    }
  },

  'updateNote': async function (req, res){
    let {content} = req.body;
    let token = req.headers['x-access-token'];
    let decoded;
    jwToken.verify(token, (err, res) => {
      if(err){
        console.error(err);
      }
      if(res) {
        decoded = res;
      }
    });
    let note = await sails.models.notes.findOne({id: req.params.id});
    console.log(req.params.id);
    console.log(note);
    try {
      if(!note) {
        res.status(404).send('Cet identifiant est inconnu');
        return;
      } else if(note.userId!==decoded.data) {
        res.status(403).send('Accès non autorisé à cette note');
        return;
      }
      let updatedNote = await sails.models.notes.update(req.params.id, {content: content}).fetch();
      res.status(200).json({
        error: null,
        note: updatedNote
      });
    } catch (error) {
      console.log(error);
      res.status(403).send({
        error: error
      });
    }
  },


  'deleteNote': async function (req, res){
    let token = req.headers['x-access-token'];
    let decoded;
    jwToken.verify(token, (err, res) => {
      if(err){
        console.error(err);
      }
      if(res) {
        decoded = res;
      }
    });
    let note = await sails.models.notes.findOne({id: req.params.id});
    try {
      if(!note) {
        res.status(404).send('Cet identifiant est inconnu');
        return;
      } else if(note.userId!==decoded.data) {
        res.status(403).send('Accès non autorisé à cette note');
        return;
      }
      let deletedNote = await sails.models.notes.destroyOne(req.params.id).fetch();
      res.status(200).send({
        error: null,
        note: deletedNote
      });
    } catch (error) {
      console.error(error);
      res.status(403).send({
        error: error
      });
    }
  },

};


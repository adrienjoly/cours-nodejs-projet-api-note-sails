/**
 * NoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Note = require("../models/Note");
let jwToken = require("../services/jwToken");
module.exports = {
  'addNote': async function (req, res){
    let db = sails.getDatastore().manager;
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
    try {
      let note = await db.collection('notes').insertOne({content: content, userId: decoded.data});
      data = {
        _id: note.ops[0]._id,
        content: note.ops[0].content
      }
      console.log(note.ops[0]);
      res.status(201).json({
        error: null,
        note: data
      });
    } catch (error) {
      console.error(error);
    }
  },

  'getAll': async function (req, res) {
    let db = sails.getDatastore().manager;
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
      let notes = await Note.find({userId:decoded.data}).sort([{createdAt: 'DESC'}]);
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
    let db = sails.getDatastore().manager;
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
    let note = await Note.findOne({id: req.params.id});
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
      let updatedNote = await Note.update(req.params.id, {content: content});
      res.status(200).json({
        error: null,
        note: updatedNote
      })
    } catch (error) {
      console.log(error);
      res.status(403).send({
        error: error
      })
    }
  },


  'deleteNote': async function (req, res){
    let db = sails.getDatastore().manager;
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
    let note = await Note.deleteOne({id: req.params.id});
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
      let deletedNote = await Note.deleteOne(req.params.id);
      res.status(200).send({
        error: null,
        note: deletedNote
      });
    } catch (error) {
      console.error(error);
      res.status(403).send({
        error: error
      })
    }
  },

};


const express = require('express');
const fs = require('fs');
const { stringify } = require('querystring');
const { promisify } = require('util');
const { v4 } = require('uuid');
var authenticate = require('../authenticate');
const cors = require('./cors');


const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

// make sure messages folder exists
const messageFolder = './public/messages/';
if (!fs.existsSync(messageFolder)) {
  fs.mkdirSync(messageFolder);
}

const audioRouter = express.Router();

audioRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )

audioRouter.get('/',cors.corsWithOptions, (req, res) => {
  readdir(messageFolder)
    .then(messageFilenames => {
      res.status(200).json({ messageFilenames });
    })
    .catch(err => {
      console.log('Error reading message directory', err);
      res.sendStatus(500);
    });
});

audioRouter.post('/',cors.corsWithOptions, (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ error: 'No req.body.message' });
  }
  const messageId = v4();
  writeFile(messageFolder + messageId, req.body.message, 'base64')
    .then(() => {
      // res.status(201).json({ message: 'Saved message', filename: messageId });
      res.statusCode = 201;
      console.log(messageId);
      res.setHeader('Content-Type', 'application/json');
      res.json(messageId );
    })
    .catch(err => {
      console.log('Error writing message to file', err);
      res.sendStatus(500);
    });
});

audioRouter.get('/:audioId',cors.corsWithOptions, (req, res) => {
  readdir(messageFolder + req.params.audioId)
    .then(res => {
      
      // res.status(200).json({ messageFilenames });
      blob = res.blob();
      console.log(blob);
      res.statusCode = 200;
      res.json(blob );
    })
    .catch(err => {
      console.log('Error reading message directory', err);
      res.sendStatus(500);
    });
});

module.exports = audioRouter;

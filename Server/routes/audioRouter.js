const express = require('express');
const fs = require('fs');
const { stringify } = require('querystring');
const { promisify } = require('util');
const { v4 } = require('uuid');
var authenticate = require('../authenticate');
const cors = require('./cors');

const { uploadFile, getFileStream } = require('../s3')

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
    .then(async () => {
      // res.status(201).json({ message: 'Saved message', filename: messageId });
      // console.log("This is the request !!!!!!!!!!!!!");
      // console.log(req.body);
      const file = {
        path: messageFolder + messageId,
        filename: messageId,
      }
      console.log(file);
      const result = await uploadFile(file);

      console.log(result);

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.json(messageId );
      console.log("This is the response !!!!!!!!!!!!!");
      console.log(res.body);



    })
    .catch(err => {
      console.log('Error writing message to file', err);
      res.sendStatus(500);
    });
});

// audioRouter.route('/:key')
// .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .get(cors.cors, (req, res) => {
//   // readdir(messageFolder + req.params.key)
//   const key = req.params.key;
//   console.log(req.params)

//   const readStream = getFileStream(key)
//   readStream.pipe(res)
//   console.log("Successfully get audio from S3")

//   // getFileStream(key)
//   //   .then(res => {
//   //     console.log("Successfully get image from S3")
//   //     // res.status(200).json({ messageFilenames });
//   //     // blob = res.blob();
//   //     // console.log(blob);
//   //     // res.statusCode = 200;
//   //     res.pipe(res );
//   //   })
//   //   .catch(err => {
//   //     console.log('Error reading message directory', err);
//   //     res.sendStatus(500);
//   //   });
// });

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

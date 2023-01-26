const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');

const { uploadFile, getFileStream } = require('../s3')


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images');
//     },

//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

// const imageFileFilter = (req, file, cb) => {
//     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('You can upload only image files!'), false);
//     }
//     cb(null, true);
// };

const upload = multer({ storage: storage});

const imageRouter = express.Router();

imageRouter.use(bodyParser.json());

imageRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser,  (req, res, next) => {

    res.statusCode = 403;
    res.end('GET operation not supported on /image');
})
.post(cors.corsWithOptions, authenticate.verifyUser, upload.single('file'), async (req, res) => {
    const file = req.file
    console.log("This is the file !!!!!!!!!!!!!");
    console.log(file)

    // apply filter
    // resize 

    const result = await uploadFile(file)
    console.log("This is the result !!!!!!!!!!!!!");

    console.log(result)
    //await unlinkFile(file.path)
    const description = req.body.description
    // console.log("xxxxxxxx")
    res.send({imagePath: `/images/${result.Key}`})

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json(req.file);
})
.put(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /image');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /image');
});

imageRouter.route('/:key')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    console.log(req.params)
    

    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
    console.log("Successfully get image from S3")
});  

module.exports = imageRouter;
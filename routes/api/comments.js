let express = require('express');
let log4js = require('log4js');
const router = express.Router();
const logger = log4js.getLogger('commentAPI');
const axios = require("axios");

router.get('/', async(req,res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
        logger.info(response.data)
        res.json(response.data)
    }catch (error) {
        logger.error(error);
    }

})

router.get('/:id', async(req,res) => {
    let commentsID = req.params.id
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments/'+commentsID)
        logger.info(response.data)
        res.json(response.data)
    }catch (error) {
        logger.error(error);
    }
})

module.exports = router
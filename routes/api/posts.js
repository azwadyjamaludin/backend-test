let express = require('express');
let log4js = require('log4js');
const axios = require("axios");
const router = express.Router();
const logger = log4js.getLogger('postsAPI');

router.get('/:id', async(req,res) => {
    let postID = req.params.id
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/'+postID)
        logger.info(response.data)
        res.json(response.data)
    }catch (error) {
        logger.error(error);
    }
})

router.get('/', async(req,res) => {
    let postUrlAll = 'https://jsonplaceholder.typicode.com/posts/'
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/')
        logger.info(response.data)
        res.json(response.data)
    }catch (error) {
        logger.error(error);
    }
})

module.exports = router
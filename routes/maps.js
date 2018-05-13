const express = require('express')
const router = express.Router()

const API = require('../lib/error')

const googleMapsClient = require('@google/maps').createClient({
    key: global.config.google.apiKey
});

router.get('/', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.send(API.RESULT(API.CODE.NOT_FOUND, {
            msg: 'query is required.'
        }))
    }

    googleMapsClient.placesAutoComplete({
        input: query,
        language: 'en',
        types: '(cities)'
    }, (err, response) => {
        if (err) {
            res.send(API.RESULT(API.CODE.ERROR, {
                msg: 'google is bad.'
            }))
        } else {
            console.log(JSON.stringify(response.json.predictions, null, 2))

            res.send(API.RESULT(API.CODE.SUCCESS, {
                predictions: response.json.predictions
            }))
        }
    })
})

module.exports = router
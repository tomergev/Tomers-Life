const express = require('express')
const router = express.Router()
const mainController = require('./controllers/main.controller')
const eventsController = require('./controllers/events.controller')

// export router
module.exports = router

// define routes
// main routes
router.get('/', mainController.showHome)

// event routes
router.get('/events', eventsController.showEvents)

// create events
router.get('/events/create', eventsController.showCreate)
router.post('/events/create', eventsController.processCreate)

// edit events
router.get('/events/:slug/edit', eventsController.showEdit)
router.post('/events/:slug', eventsController.processEdit)

// delete event
// we are passing in a delete url parameter in order to delete an event
router.get('/events/:slug/delete', eventsController.deleteEvent)

// show a single event
router.get('/events/:slug', eventsController.showSingle)
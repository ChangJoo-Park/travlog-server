const express = require('express')
const router = express.Router()

const API = require('../lib/error')

const User = require('../db/user')
const Note = require('../db/note')
const auth = require('../lib/auth')

router.post('/', auth.ensureAuthorized, async (req, res) => {
    const userId = req.user.id

    const { title, destinations } = req.body

    if (!title) {
        return res.sendResult(API.CODE.ERROR, {
            msg: 'Title is required.'
        })
    }

    const noteParams = {
        userId, title, destinations
    }

    try {
        const result = await Note.create(noteParams)

        const note = await Note.getItem(userId, result.id)
        
        return res.sendResult(API.CODE.SUCCESS, note)
    } catch (e) {
        console.error(e)
        return res.sendResult(API.CODE.ERROR.DEFAULT)
    }
})

router.get('/', auth.ensureAuthorized, async (req, res) => {
    const userId = req.user.userId

    try {
        const notes = await Note.getListByUid(userId)
        return res.sendResult(API.CODE.SUCCESS, {
            list: notes
        })
    } catch (e) {
        console.error(e)
        return res.sendResult(API.CODE.ERROR.DEFAULT)
    }
})

router.get('/:noteId', auth.ensureAuthorized, async (req, res) => {
    const uid = req.user.uid
    const noteId = req.params.noteId

    try {
        const note = await Note.getItem(uid, noteId)

        if (!note) {
            return res.sendResult(API.CODE.NOT_FOUND, {
                msg: 'Note not found.'
            })
        }

        return res.sendResult(API.CODE.SUCCESS, note)
    } catch (e) {
        console.error(e)
        return res.sendResult(API.CODE.ERROR.DEFAULT)
    }
})

router.put('/:noteId', auth.ensureAuthorized, async (req, res) => {
    const uid = req.user.uid
    const noteId = req.params.id

    const { title } = req.body

    const noteParams = {
        uid, noteId, title
    }

    try {
        await Note.update(noteParams)

        const note = await Note.get(noteParams)

        return res.sendResult(API.CODE.SUCCESS, note)
    } catch (e) {
        console.error(e)
        return res.sendResult(API.CODE.ERROR.DEFAULT)
    }
})

router.delete('/:noteId', auth.ensureAuthorized, async (req, res) => {
    const uid = req.user.uid
    const noteId = req.params.noteId

    try {
        const note = await Note.getItem(uid, noteId)

        if (!note) {
            return res.sendResult(API.CODE.NOT_FOUND, {
                msg: 'Note not found.'
            })
        }

        const result = await Note.delete(uid, noteId)
        console.log('delete result?', result)

        return res.sendResult(API.CODE.SUCCESS, {
            id
        })
    } catch (e) {
        console.error(e)
        return res.sendResult(API.CODE.ERROR.DEFAULT)
    }
})

module.exports = router

var express = require('express');

var router = express.Router();

const Entry = require('../models/Entry');



router.get('/', async function (req, res, next) {

    try {

        const entries =
            await Entry.find()
                .sort({ createdAt: -1 });

        res.json(entries);

    } catch (error) {

        res.status(500).json({
            error: "Failed to fetch entries"
        });

    }

});


router.post('/', async function (req, res, next) {

    try {

        const newEntry = new Entry({

            title: req.body.title,

            currentAge: req.body.currentAge,

            youngerAge: req.body.youngerAge,

            emotion: req.body.emotion,

            message: req.body.message,

            tags: req.body.tags

        });

        const savedEntry =
            await newEntry.save();

        res.status(201).json(savedEntry);

    } catch (error) {

        res.status(400).json({
            error: "Failed to create entry"
        });

    }

});



router.get('/:id', async function (req, res, next) {

    try {

        const entry =
            await Entry.findById(req.params.id);

        if (!entry) {

            return res.status(404).json({
                error: "Entry not found"
            });

        }

        res.json(entry);

    } catch (error) {

        res.status(500).json({
            error: "Invalid ID"
        });

    }

});



router.put('/:id', async function (req, res, next) {

    try {

        const updated =
            await Entry.findByIdAndUpdate(

                req.params.id,
                req.body,
                { new: true }

            );

        if (!updated) {

            return res.status(404).json({
                error: "Entry not found"
            });

        }

        res.json(updated);

    } catch (error) {

        res.status(400).json({
            error: "Failed to update entry"
        });

    }

});


router.delete('/:id', async function (req, res, next) {

    try {

        const deleted =
            await Entry.findByIdAndDelete(req.params.id);

        if (!deleted) {

            return res.status(404).json({
                error: "Entry not found"
            });

        }

        res.json({
            message: "Entry deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: "Failed to delete entry"
        });

    }

});


module.exports = router;
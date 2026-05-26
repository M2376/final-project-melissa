var express = require('express');

var router = express.Router();



const Entry = require("../models/Entry");



router.post('/', async function (req, res) {
    console.log("POST HIT");

    try {

        const newEntry = new Entry({

            title: req.body.title,
            currentAge: req.body.currentAge,
            youngerAge: req.body.youngerAge,
            emotion: req.body.emotion,
            message: req.body.message,

            tags: Array.isArray(req.body.tags)
                ? req.body.tags
                : (req.body.tags || "")
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(tag => tag !== "")

        });

        const savedEntry = await newEntry.save();

        res.status(201).json(savedEntry);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }


});


router.get("/", async (req, res) => {

    try {

        const entries = await Entry.find({}).sort({ createdAt: -1 });

        res.json(entries);

    } catch (err) {

        res.status(500).json({
            error: err.message
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
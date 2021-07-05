const express = require("express");
const chip = require("../models/chip");
const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    chip.all(function (data) {
        let hbsObject = {
            chips: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/chips", function (req, res) {
   console.log("Made a chip!", req.body)
    chip.create([
        "chip", "sku", "removed"
    ], [
        req.body.chip, 0
    ], function (result) {
        console.log(result);
        // Send back the ID of the new chip
        res.json({ id: result.insertId });
    });
});

router.put("/api/chips/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    chip.update({
        removed: true
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


module.exports = router;
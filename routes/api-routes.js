const db = require("../models");
const router = require("express").Router();
const mongojs = require("mongojs");


// Saves an order to the database's collection
// ===========================================
router.post("/api/orders", (req, res) => {
    db.order.create({})
        .then((dborder) => {
            res.json(dborder);
        })
        .catch((err) => {
            res.json(err);
        });
});
// Retrieves all orders from the database's collection
// GET: /all
// ====================================================
router.get("/api/orders", (req, res) => {
   
    db.order.aggregate
    ([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            }
        }

    ]).then((dborders) => { res.json(dborders); })
        .catch((err) => { res.json(err); });
});
// 3. Retrieves one order in the database's collection by it's ObjectId
// GET: /find/:id
// ==================================================================
router.get("/api/orders/:id", (req, res) => {
    const id = req.params.id

    db.order.find(
        _id = mongojs.ObjectId(id), (err, found) => {
            if (err) {
                console.log(err);
            } else {
                res.json(found);
            }
        }

    );

});
// 4. Updates one order in the database's collection by it's ObjectId
// POST: /update/:id
// ================================================================
router.put("/api/orders/:id", (req, res) => {
    const id = req.params.id
    console.log(id, " ", req.body)
    db.order.findByIdAndUpdate
        (id,
            { $push: { exercises: req.body } }, (err, found) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(found);
                }

            });

});
// 5. Deletes one order from the database's collection by it's ObjectId
// DELETE: /delete/:id
// ==================================================================
router.delete("/api/orders/:id", (req, res) => {
    db.order.remove(_id = mongojs.ObjectId(req.id), (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
// 6. Clear the entire order collection
// DELETE: /clearall
// ===================================
router.delete("/api/orders/", (req, res) => {
    db.order.remove({}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});

router.get("/api/orders/range", (req, res) => {

    db.order.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            }
        }

    ])
        .limit(7)
        .sort({ _id: -1 })
        .then((dborders) => { res.json(dborders); })
        .catch((err) => { res.json(err); });
});

module.exports = router;
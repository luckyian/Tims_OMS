const path = require("path");
const router = require("express").Router();

 

  
    router.get("/order", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/order.html"))
    });

    router.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"))
    });

    module.exports = router;

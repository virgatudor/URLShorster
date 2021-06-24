const express = require("express");
const router = express.Router();
const ShortURLController = require("../controllers/ShortURLController");


router.post("/", ShortURLController.createShortURL);
router.get("/:shortcode", ShortURLController.redirectToURL);
router.get("/:shortenedURL/stats", ShortURLController.getURLStats);

module.exports = router;

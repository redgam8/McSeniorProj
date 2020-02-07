const express = require('express');
const router = express.Router();

router.get("/", function(req, res) {
  res.render("travel-info", req.TPL);
});

module.exports = router;

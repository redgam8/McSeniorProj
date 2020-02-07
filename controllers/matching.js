const express = require('express');
const router = express.Router();

router.get("/", function(req, res) {
  res.render("matching", req.TPL);
});

module.exports = router;

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('home');
});

router.get("/serv", (req, res) => {
    const user = {"name": "john", "age": "14"};
    res.json(user);
});

module.exports = router;
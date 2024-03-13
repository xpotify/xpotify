const express = require('express'),
      app = express(),
      PORT = 6969;

require('dotenv').config();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static('public'));

app.get("/", (req, res) =>{
    res.render('home');
});


// Json implementaion
// app.get("/serv", (req, res) => {
//     const user = {"name": "john", "age": "14"};
//     res.json(user);
// });

app.listen(PORT || process.env.PORT, process.env.IP, () => {
    console.log('xpotify server is up on PORT: ' + PORT);
});

const router = require("express").Router();
const Models = require("../../models/index");

//crypto add route
// matches /api/crypto/add
router.route('/add').post((req, res) => {
    Models.Stock.exists({crypto_name: req.body.crypto_name}).then(data => {
        console.log(data, "data herre")
      if (data === true) {
          res.send({err: "you're already following"})
          console.log("already here")
        }
        else {
          console.log(req.body, 'HERE IT IS ');
          let stock = {
            crypto_name: req.body.crypto_name,
            notes: req.body.notes,
            admin: req.body.admin,
          }
          Models.Stock.create(stock).then(data => res.send(data))
          .catch(err => res.status(422).json(err));
          console.log("Crypto added to watchlist");
        }
    });
})

module.exports = router;
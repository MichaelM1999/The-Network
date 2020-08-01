const router = require("express").Router();
const Models = require("../../models/index");

//crypto add route
// matches /api/crypto/add
router.route('/add').post((req, res) => {
    Models.Crypto.exists({crypto_name: req.body.crypto_name}).then(data => {
        console.log(data, "data herre")
      if (data === true) {
          res.send({err: "you're already following"})
          console.log("already here")
        }
        else {
          console.log(req.body, 'HERE IT IS ');
          let CRYPTO = {
            crypto_name: req.body.crypto_name,
            notes: req.body.notes,
            admin: req.body.admin,
          }
          Models.Crypto.create(CRYPTO).then(data => res.send(data))
          .catch(err => res.status(422).json(err));
          console.log(CRYPTO.crypto_name + " added to watchlist");
        }
    });
})

module.exports = router;
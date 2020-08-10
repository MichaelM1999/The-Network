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
            Crypto: true,
          }
          Models.Crypto.create(CRYPTO).then(data => res.send(data))
          .catch(err => res.status(422).json(err));
          console.log(CRYPTO.crypto_name + " added to watchlist");
        }
    });
})
router.route('/find').post((req, res) => {
  console.log('Finding all followed Cryotocurrency');
Models.Crypto.find({Crypto: true}).then(data => {
  console.log(data);
  if (data){
    console.log(data)
    res.send(data);
  } else {
    res.send("no Cryptos are followed");
  }
})
});

module.exports = router;
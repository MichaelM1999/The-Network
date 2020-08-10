const router = require("express").Router();
const Models = require("../../models/index");

// matches /api/stocks/add
router.route('/add').post((req, res) => {
    Models.Stock.exists({stock_name: req.body.stock_name}).then(data => {
        console.log(data, "data herre")
      if (data === true) {
          res.send({err: "you're already following"})
          console.log("already here")
        }
        else {
          console.log(req.body, 'HERE IT IS ');
          let stock = {
            stock_name: req.body.stock_name,
            notes: req.body.notes,
            admin: req.body.admin,
            Crypto: false,
          }
          Models.Stock.create(stock).then(data => res.send(data))
          .catch(err => res.status(422).json(err));
          console.log("stock added to watchlist");
        }
    });
})
router.route('/delete').post((req, res) =>{
    Models.Stock.deleteOne({stock_name: req.body.stock_name}).then(data =>{
      res.send(data)
      // .catch(err => res.status(422).json(err));
      console.log("deleteing", req.body.stock_name);
    })
})
router.route('/find').post((req, res) => {
    console.log('hellooooo finding all followed stocks');
  Models.Stock.find({Crypto: false}).then(data => {
    console.log(data);
    if (data){
      console.log(data)
      res.send(data);
    } else {
      res.send("no stocks followed");
    }
  })
});

module.exports = router;
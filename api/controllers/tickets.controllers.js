var mongoose = require('mongoose');
var Ticket   = mongoose.model('Ticket');

module.exports.ticketAddOne = function(req, res) {

  console.log('POST ticket');

  Ticket
  .create({
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    image: req.body.image
  }, function(err, ressource){
    if(err){
      res
      .status(400)
      .json(err);
    }else{
      res
      .status(201)
      .json(ressource);
    }
  });
};

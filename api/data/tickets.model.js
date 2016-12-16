var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
  title : {
    type     : String,
    required : true
  },
  description : {
    type : String
  },
  image : {
    type : String
  }
});

mongoose.model('Ticket', ticketSchema);

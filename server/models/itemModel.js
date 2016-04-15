var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var itemSchema = new Schema({
  owner : {type: Schema.ObjectId, ref:'User', childPath: 'inventory'},
  itemName : String,
  borrowed : Boolean,
  requested: Boolean,
  whoWantsIt: {type: Schema.ObjectId, ref:'User'},
  itemDescription: String,
  picture: {type: Schema.Types.Mixed},
  createdAt: {type: Date, default: Date.now}
});

itemSchema.pre('save', function(next){
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

itemSchema.plugin(relationship, {relationshipPathName: 'owner'});

//Create a model using the schema
var Item = mongoose.model('Item', itemSchema);
module.exports = Item;


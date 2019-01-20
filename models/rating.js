let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const RatingSchema = new Schema({
    language              : {  type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
    rating                : { type: Number, required: true },
    deleted               : { type: Boolean, default: false },
    created_at            : { type: Date, default: Date.now },
    updated_at            : { type: Date, default: Date.now }
});


RatingSchema.pre('update', function() {

    this.update({},{ $set: { updated_at: new Date() } });

});

module.exports = mongoose.model('Rating', RatingSchema);
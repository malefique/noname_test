let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    name                  : { type: String, required: true },
    rating                : { type: Number, required: true },
    deleted               : { type: Boolean, default: false },
    created_at            : { type: Date, default: Date.now },
    updated_at            : { type: Date, default: Date.now }
});


LanguageSchema.pre('update', function() {

    this.update({},{ $set: { updated_at: new Date() } });

});

module.exports = mongoose.model('Language', LanguageSchema);
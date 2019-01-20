const models = require('../models'),
    config = require('../config'),
    mongoose = require('mongoose');

exports.get = function(params, callback) {
    models.language.aggregate([
        {
            '$match': {
                'deleted': false
            },
        },
        {
            "$skip": params.offset
        },
        {
            "$limit": params.count
        },
        {
            "$sort": {
                'rating': -1
            }
        },
        {
            "$lookup": {
                "from" : "ratings",
                "localField" : "_id",
                "foreignField" : "language",
                "as" : "ratings"
            }
        },
        {
            "$project": {
                "_id": "$_id",
                "name": "$name",
                "min": {
                    "$min": "$ratings.rating"
                },
                "max": {
                    "$max": "$ratings.rating"
                },
                "rating": "$rating"
            }
        }
    ], function(err, data){
        for(let lang of data){
            lang.direction = true;
            if(lang.rating >= lang.max){
                lang.diff = lang.rating - lang.min;
            }
            else {
                lang.diff = lang.max - lang.rating;
                lang.direction = false;
            }
            delete lang.min;
            delete lang.max;
        }
        callback(err, data);
    });
};

exports.add = function(params, callback) {
    let language = new models.language(params);
    language.validate(function(err){
        if(err)
            callback(err, null);
        else {
            language.save(function(err,data){
                if(err)
                    callback(err, null);
                else {
                    let rating = new models.rating({
                        language: mongoose.Types.ObjectId(data._id),
                        rating: params.rating
                    });
                    rating.save(function(err, rating){
                        if(err)
                            callback(err, null);
                        else
                            callback(err, data);
                    });
                }
            });
        }
    });
};

exports.edit = function(_id, params, callback) {

    models.language.updateOne({ _id: mongoose.Types.ObjectId(_id)}, params, function(err,data){
        if(err)
            callback(err, null);
        else {
            if(data.nModified > 0) {
                let rating = new models.rating({
                    language: mongoose.Types.ObjectId(_id),
                    rating: params.rating
                });
                rating.save(function (err, rating) {
                    if (err)
                        callback(err, null);
                    else
                        callback(err, data);
                });
            }
            else
                callback(err,data);
        }
    });
};

exports.delete = function(_id, callback) {
    models.language.deleteOne({ _id: mongoose.Types.ObjectId(_id)}, function(err, data){
        if(err)
            callback(err, null);
        else{
            models.rating.delete( { language: mongoose.Types.ObjectId(_id) }, function(err, rData){
                if(err)
                    callback(err, null);
                else
                    callback(err, data);
            })
        }
    });
};

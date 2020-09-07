const mongoose = require('mongoose');

const cerealSchema = mongoose.Schema({
    name: String,
    description: String,
    brand: String,
    imageURL: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: {
            type: String,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

cerealSchema.index({
    name: 'text'
})

const Cereal = mongoose.model('Cereal', cerealSchema);

module.exports = Cereal;
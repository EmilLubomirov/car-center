const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String } = Schema.Types;

const serviceTagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = new Model('Service-Tag', serviceTagSchema);
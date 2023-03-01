const mongoose = require("mongoose")

const Schema = mongoose.Schema

let commentSchema = new Schema ({
    commentToPost: {type: Schema.Types.ObjectId},
    comment: {type: String},
    creator: {type: String},
    creationdate: {type: String}
})

module.exports = mongoose.model("comments", commentSchema)
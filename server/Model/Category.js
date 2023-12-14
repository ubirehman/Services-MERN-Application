import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    }
})

export default mongoose.model('category', CategorySchema);
import mongoose from "mongoose";

const ServiceSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: ['UnAttended', 'Assigned To', 'Completed'],
        default: 'UnAttended'
    },
    image: {
        type: String
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    attendantUserId: {
        type: mongoose.ObjectId,
        ref: 'user'
    }

}, { timestamps: true })

export default mongoose.model('service', ServiceSchema);
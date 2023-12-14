import mongoose from "mongoose";

const VoucherSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    redeemcount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Expired'],
        default: 'Active'
    },
    slug: {
        type: String,
    }
})

export default mongoose.model('voucher', VoucherSchema);
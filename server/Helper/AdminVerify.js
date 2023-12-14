import User from "../Model/User.js";

export const VerifyAdmin = async (req, res, next) => {

    const id = req.user._id;
    const { role } = await User.findById(id).select('role');

    if (role === 'user') {
        return res.status(401).send({
            success: false,
            message: 'You are not authorized to perform this action'
        })
    }
    next();
}
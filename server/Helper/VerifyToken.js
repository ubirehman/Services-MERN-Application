import Jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
    Jwt.verify(req.headers.authorization, process.env.JWT_SEC, (error, user) => {
        if (error) {
            return res.status(401).send({
                success: false,
                message: "You are not authenticated. Please login again."
            });
        }
        req.user = user;
        next();
    })
}
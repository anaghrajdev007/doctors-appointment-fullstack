const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // Correctly split the Authorization header to extract the token
        const tokenHeader = req.headers['authorization'];
        if (!tokenHeader) throw new Error('No token provided');

        const token = tokenHeader.split(" ")[1]; // Correctly split by space to get the token
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ // 401 Unauthorized is more appropriate here
                    message: 'Auth Failed',
                    success: false
                });
            } else {
                req.body.userId = decoded.id; // Make sure this matches the payload structure of your JWT
                next();
            }
        });
    } catch (error) {
        res.status(401).send({ // Use 401 for authentication errors
            message: 'Auth Failed',
            success: false,
            error: error.message // Optionally, provide more detail for debugging
        });
    }
};

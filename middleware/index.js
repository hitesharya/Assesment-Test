const jwt = require("jsonwebtoken");
const { User } = require("../models");

const secretKey = process.env.JWT_SECRET || "6767676888";

const signToken = (user) => {
  const payload = {
    sub: user._id,
  };
  return jwt.sign(payload, secretKey);
};

const verifyToken = (req, res, next) =>
  jwt.verify(req.headers.authorization, secretKey, async (err, decoded) => {
    if (err || !decoded || !decoded.sub) {
      return res.status(401).send({
        success: false,

        message: "UNAUTHORIZED",
      });
    }

    const user = await User.findOne({
      _id: decoded.sub,
      isDeleted: false,
    });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "UNAUTHORIZED",
      });
    }

    req.user = user;

    next();
  });

module.exports = {
  verifyToken,
  signToken,
};

import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

const JWT = {
  createToken: (user) => {
    return "thisisthetokenof:" + user.id;
  },
  verify: (token) => {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      throw new Error("token is not verified");
    }
  },

  generateToken: (user) => {
    return jwt.sign(
      {
        sub: user.id,
        role: user.role
      },
      secret
    );
  }
};

export default JWT;

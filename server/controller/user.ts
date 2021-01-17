import Users from "../services/user";
import JWT from "../services/jwt";

const Auth = {
  Signup: async (req, res) => {
    const obj = req.body;
    try {
      const user = await Users.getByEmail(obj.email);
      if (user) {
        return res.status(409).send({ message: "Email already exists" });
      }
      const newUser = await Users.createUser(obj);
      if (newUser) {
        return res
          .status(200)
          .send({ data: "", message: "Successfully Signup. Please login!" });
      }
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .send({ message: "Something went wrong, Please try again" });
    }
  },

  Login: async (req, res) => {
    try {
      const obj = req.body;
      let user = await Users.getByEmail(obj.email);
      if (user) {
        const comparePass = Users.compare(user.password, obj.password);
        if (comparePass) {
          const token = JWT.generateToken(user);
          delete user.password;
          return res
            .status(200)
            .send({ data: { user, token }, message: "Successfully Login" });
        } else {
          return res
            .status(409)
            .send({ message: "Email/Password does not match!" });
        }
      }
      return res
        .status(404)
        .send({ data: { user }, message: "Email/Password does not match!" });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  },

  autoLogin: async (req, res) => {
    try {
      let user = await Users.getById({ _id: req.params.id });
      const token = JWT.generateToken(user);
      if (user) {
        return res
          .status(200)
          .send({ data: { user, token }, message: "Successfully Login" });
      }
      return res.status(404).send({
        data: { user },
        message: "Something went wrong, Please try again"
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  }
};

export default Auth;

import user from "../models/user";
import userFromService from "../services/user";
import JWT from "../services/jwt";

const Auth = {
  Signup: async (req, res) => {
    const obj = req.body;
    try {
      const user = await userFromService.getByEmail(obj.email);
      if (user) {
        return res.status(409).send({ message: "Email already exists" });
      }
      const newUser = await userFromService.createUser(obj);
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
      let user = await userFromService.getByEmail(obj.email);
      if (user) {
        const comparePass = userFromService.compare(
          user.password,
          obj.password
        );
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

  AutoLogin: async (req, res) => {
    try {
      let user = await userFromService.getById({ _id: req.params.id });
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
  },

  UpdateUser: async (req, res) => {
    try {
      let note = await userFromService.getById(req.body._id);
      if (!note) {
        return res.status(404).send({ data: {}, message: "User Not found" });
      }
      const query = { _id: req.body._id };
      const options = { new: true, runValidators: true };
      const update = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        picture: req.body.picture,
        paidSalariesMonth: req.body.paidSalariesMonth,
        dob: req.body.dob,
        updatedAt: Date.now()
      };
      let item = await user.findOneAndUpdate(query, update, options);
      if (item) {
        return res
          .status(200)
          .send({ data: item, message: "User updated Successfully" });
      }
      return res
        .status(409)
        .send({ data: {}, message: "Something went wrong, Please try again" });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  }
};

export default Auth;

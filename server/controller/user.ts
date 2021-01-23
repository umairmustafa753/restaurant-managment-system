import user from "../models/user";
import userFromService from "../services/user";
import JWT from "../services/jwt";

const User = {
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
          user.password = null;
          user.otp = null;
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
        user.password = null;
        user.otp = null;
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
      let userDB = await userFromService.getById(req.body._id);
      if (!userDB) {
        return res.status(404).send({ data: {}, message: "User Not found" });
      }
      const query = { _id: req.body._id };
      const options = { new: true, runValidators: true };
      const update = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        picture: req.body.picture,
        salary: req.body.salary,
        paidSalariesMonth: req.body.paidSalariesMonth,
        dob: req.body.dob,
        updatedAt: Date.now()
      };
      const item = await user.findOneAndUpdate(query, update, options);
      if (item) {
        item.password = null;
        item.otp = null;
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
  },

  EmailVerification: async (req, res) => {
    try {
      const obj = req.body;
      let userDB = await userFromService.getByEmail(obj.email);
      if (!userDB) {
        return res.status(404).send({ data: {}, message: "Email Not found" });
      }
      const otp = Math.floor(1000 + Math.random() * 9000);
      const query = { _id: userDB._id };
      const options = { new: true, runValidators: true };
      const update = {
        otp: otp,
        updatedAt: Date.now()
      };
      const item = await user.findOneAndUpdate(query, update, options);
      const isEmailSend = await userFromService.emailVerification({
        otp,
        email: obj.email
      });
      if (item && isEmailSend) {
        return res
          .status(200)
          .send({ data: {}, message: "Email with OTP sended" });
      } else if (!isEmailSend) {
        return res
          .status(409)
          .send({ data: {}, message: "Failed to send email" });
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  },

  otpVerification: async (req, res) => {
    try {
      const obj = req.body;
      let userDB = await userFromService.getByEmail(obj.email);
      if (!userDB) {
        return res.status(404).send({ data: {}, message: "Email Not found" });
      }
      if (`${obj.otp}` === `${userDB.otp}`) {
        return res
          .status(200)
          .send({ data: {}, message: "OTP verified successfully" });
      } else {
        return res.status(409).send({ data: {}, message: "Wrong OTP entered" });
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  },

  ResestPassword: async (req, res) => {
    const obj = req.body;
    try {
      const userDB = await userFromService.getByEmail(obj.email);
      if (!userDB) {
        return res.status(404).send({ data: {}, message: "Email Not found" });
      }
      const password = await userFromService.resestPassword(obj.password);
      const query = { _id: userDB._id };
      const options = { new: true, runValidators: true };
      const update = {
        password: password,
        updatedAt: Date.now()
      };
      const item = await user.findOneAndUpdate(query, update, options);
      if (item) {
        return res
          .status(200)
          .send({ data: {}, message: "Password changed successfully" });
      }
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .send({ message: "Something went wrong, Please try again" });
    }
  },

  GetUsers: async (req, res) => {
    try {
      let users = await userFromService.getUsers({ role: req.params.role });
      if (users.length) {
        return res
          .status(200)
          .send({ data: users, message: `${req.params.role} are found` });
      } else {
        return res
          .status(404)
          .send({ data: users, message: `${req.params.role} are not found` });
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  },

  GetUser: async (req, res) => {
    try {
      let user = await userFromService.getById({ _id: req.params.id });
      const token = JWT.generateToken(user);
      if (user) {
        user.password = null;
        user.otp = null;
        return res
          .status(200)
          .send({ data: { user, token }, message: "User Fetch Successfully" });
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

export default User;

import * as bcrypt from "bcryptjs";
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

import User from "../models/user";
import { EMAIL } from "./constants";

const saltRounds = 10;
dotenv.config();

const salt = () => {
  return bcrypt.genSaltSync(saltRounds);
};

const Users = {
  createUser: async (obj: any) => {
    try {
      obj.password = bcrypt.hashSync(obj.password, salt());
      const newUser = new User(obj);
      const data = await newUser.save();
      if (data) {
        return data;
      }
      throw data;
    } catch (error) {
      throw error;
    }
  },

  resestPassword: async (password: string) => {
    try {
      password = bcrypt.hashSync(password, salt());
      if (password) {
        return password;
      }
      throw password;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: object) => {
    const query = User.findById(id).select(
      "_id firstName lastName username email role createdAt updatedAt"
    );
    try {
      return await query.exec();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  emailVerification: async (obj: any) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.USEREMAIL,
          pass: process.env.USERPASS
        }
      });

      const htmlBody = `<p>${EMAIL.MESSAGE}: ${obj.otp}</p>`;
      const mail = {
        from: process.env.USEREMAIL,
        to: obj.email,
        subject: EMAIL.SUBJECT,
        html: htmlBody
      };

      transporter.sendMail(mail, function (err, info) {
        if (err) return false;
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getByEmail: async (email: string) => {
    try {
      const query = User.findOne({ email });
      return await query.exec();
    } catch (error) {
      throw error;
    }
  },

  compare: (hash: any, pass: any): boolean => {
    if (bcrypt.compareSync(pass, hash)) return true;
    return false;
  }
};

export default Users;

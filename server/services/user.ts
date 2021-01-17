import * as bcrypt from "bcryptjs";
import User from "../models/user";

const saltRounds = 10;

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

import MenuList from "../models/menuList";

const MenuListController = {
  AddMenuList: (req, res) => {
    try {
      const MenuListDB = new MenuList(req.body);
      MenuListDB.save().then((result) => {
        res.status(200).json({
          MenuList: result,
          message: "Menu Items added Succesfully"
        });
      });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, Please try again" });
    }
  },
  getMenuList: async (req, res) => {
    try {
      MenuList.find()
        .then((MenuList) => {
          res.status(200).json({ MenuList: MenuList });
        })
        .catch((err) => console.log("error message: ", err));
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, Please try again" });
    }
  }
};

export default MenuListController;

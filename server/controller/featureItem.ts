import featuredItems from "../models/featureItem";

const featuredItem = {
  AddFeaturedItems: (req, res) => {
    try {
      const FeaturedItemsDB = new featuredItems(req.body);
      FeaturedItemsDB.save().then((result) => {
        res.status(200).json({
          FeaturedItems: result,
          message: "Featured Items Succesfully"
        });
      });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, Please try again" });
    }
  },
  GetFeaturedItems: async (req, res) => {
    try {
      featuredItems
        .find()
        .then((featuredItems) => {
          res.status(200).json({ featuredItems: featuredItems });
        })
        .catch((err) => console.log("error message: ", err));
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, Please try again" });
    }
  }
};

export default featuredItem;

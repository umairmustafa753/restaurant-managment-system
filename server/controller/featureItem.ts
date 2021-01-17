import featureItems from "../models/featureItem";

const featuredItem = {
  AddFeaturedItems: (req, res) => {
    try {
      const FeatureItemsDB = new featureItems(req.body);
      FeatureItemsDB.save().then((result) => {
        res.status(200).json({
          FeatureItems: result,
          message: "Featured Items Succesfully"
        });
      });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, Please try again" });
    }
  },
  getFeaturedItems: async (req, res) => {
    try {
      featureItems
        .find()
        .then((featureItems) => {
          res.status(200).json({ featureItems: featureItems });
        })
        .catch((err) => console.log("error message: ", err));
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, Please try again" });
    }
  }
};

export default featuredItem;

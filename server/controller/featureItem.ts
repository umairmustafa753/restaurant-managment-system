// const Candidate = require("../model/candidates");
import featureItems from "../models/featureItem";

const featuredItem = {
  AddFeaturedItem: (req, res) => {
    try {
      const CandidateDB = new featureItems(req.body);
      CandidateDB.save().then((result) => {
        res.status(200).json({
          FeatureItems: result,
          message: "Featured Items Succesfully"
        });
      });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, Please try again" });
    }
  }
};

export default featuredItem;

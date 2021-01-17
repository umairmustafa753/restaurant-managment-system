import { validationResult } from "express-validator";

const expressValidator = (req, res, next) => {
  //For Errors
  const errors = validationResult(req);
  //Handling Errors
  if (!errors.isEmpty()) {
    const firsterror = errors.array()[0];
    return res.status(400).json({ error: firsterror.msg });
  }
  //next middleware
  next();
};

export default expressValidator;

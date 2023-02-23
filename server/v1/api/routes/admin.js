import { Router } from "express";
const router = Router();
import { hash as _hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { validateLogin } from "../validator";

//mocking admin credentials
const adminInfo = {
  email: "innocentaganzwa@gmail.com",
  id: "innocentaganzwa@gmail.com",
  password: "$2b$10$uCo81jfEWjcgrkd0vpgdhuQcKE.wG6F1xUnjp4pCWNLVzuqKdpyYa", // innocent
};

router.post("/login", (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    console.log(error);
    return res.send(error.details);
  }
  try {
    if (req.body.email != adminInfo.email) {
      return res.status(402).json({
        message: "Auth failed",
      });
    }
    compare(req.body.password, adminInfo.password, (err, result) => {
      if (err) {
        return res.status(402).json({
          message: "Auth failed",
        });
      }
      if (result) {
        const token = sign(
          {
            email: adminInfo.email,
            adminId: adminInfo._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token,
        });
      }
      res.status(404).json({
        message: "Auth failed",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

export default router;

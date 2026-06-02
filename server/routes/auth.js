// backend/routes/auth.js

const express = require("express");

const router = express.Router();

const User = require("../models/User");


// ================= REGISTER =================

router.post(
  "/register",

  async (req, res) => {

    try {

      const {

        name,

        email,

        password,

        role,

        skills,

        phone,

        city,

        area

      } = req.body;

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400).json({

          message:
            "Email already exists"

        });
      }

      const user = new User({

        name,

        email,

        password,

        role,

        skills,

        phone,

        city,

        area

      });

      await user.save();

      res.json({

        success: true,

        user

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
          "Registration Failed"

      });

    }
  }
);


// ================= LOGIN =================

router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password,
        role
      } = req.body;

      const user =
        await User.findOne({

          email:
            email.trim(),

          password:
            password.trim(),

          role:
            role.trim()

        });

      if (!user) {

        return res.status(400).json({

          message:
            "Invalid Credentials"

        });
      }

      res.json({

        success: true,

        user

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false

      });

    }
  }
);


// ================= GET WORKERS =================

router.get(
  "/workers",

  async (req, res) => {

    try {

      const workers =
        await User.find({
          role: "labour"
        });

      res.json(workers);

    } catch (err) {

      res.status(500).json({

        success: false

      });

    }
  }
);

module.exports = router;
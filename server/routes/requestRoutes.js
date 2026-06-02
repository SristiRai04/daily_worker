// backend/routes/requestRoutes.js

const express = require("express");

const router = express.Router();

const Request =
  require("../models/Request");


// =========================
// SEND REQUEST
// =========================

router.post(
  "/send",

  async (req, res) => {

    try {

      const newRequest =
        new Request({

          customerName:
            req.body.customerName,

          customerId:
            req.body.customerId,

          labourId:
            req.body.labourId,

          labourName:
            req.body.labourName,

          workType:
            req.body.workType,

          location:
            req.body.location,

          date:
            req.body.date,

          timings:
            req.body.timings,

          status:
            "Pending",

          labourResponse:
            "Waiting",

          customerDecision:
            "Waiting"

        });

      await newRequest.save();

      res.json({

        success: true,

        message:
          "Request Sent Successfully"

      });

    } catch (err) {

      res.status(500).json({

        error:
          err.message

      });

    }
  }
);


// =========================
// CUSTOMER REQUESTS
// =========================

router.get(
  "/customer/:name",

  async (req, res) => {

    try {

      const requests =
        await Request.find({

          customerName:
            req.params.name

        });

      res.json(requests);

    } catch (err) {

      res.status(500).json({

        error:
          err.message

      });

    }
  }
);


// =========================
// LABOUR REQUESTS
// =========================

router.get(
  "/labour/:id",

  async (req, res) => {

    try {

      const requests =
        await Request.find({

          labourId:
            req.params.id

        });

      res.json(requests);

    } catch (err) {

      res.status(500).json({

        error:
          err.message

      });

    }
  }
);


// =========================
// LABOUR RESPONSE
// =========================

router.put(
  "/labour-response/:id",

  async (req, res) => {

    try {

      const {
        price,
        action
      } = req.body;

      await Request.findByIdAndUpdate(

        req.params.id,

        {

          labourPrice:
            Number(price),

          labourResponse:
            action,

          status:
            action

        }

      );

      res.json({

        success: true,

        message:
          "Labour Response Updated"

      });

    } catch (err) {

      res.status(500).json({

        error:
          err.message

      });

    }
  }
);


// =========================
// CUSTOMER DECISION
// =========================

router.put(
  "/customer-decision/:id",

  async (req, res) => {

    try {

      const {
        decision
      } = req.body;

      await Request.findByIdAndUpdate(

        req.params.id,

        {

          customerDecision:
            decision

        }

      );

      res.json({

        success: true,

        message:
          "Customer Decision Updated"

      });

    } catch (err) {

      res.status(500).json({

        error:
          err.message

      });

    }
  }
);


// =========================
// FEEDBACK
// =========================

router.put(
  "/feedback/:id",

  async (req, res) => {

    try {

      const {
        rating,
        comment
      } = req.body;

      const updatedRequest =
        await Request.findByIdAndUpdate(

          req.params.id,

          {

            feedback: {

              rating:
                Number(rating),

              comment

            }

          },

          { new: true }

        );

      res.json({

        success: true,

        updatedRequest

      });

    } catch (err) {

      res.status(500).json({

        error:
          err.message

      });

    }
  }
);

module.exports = router;
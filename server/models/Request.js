// backend/models/Request.js

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(

  {

    customerName: String,

    customerId: String,

    labourId: String,

    labourName: String,

    workType: String,

    location: String,

    date: String,

    timings: [String],

    status: {

      type: String,

      default: "Pending"

    },

    labourResponse: {

      type: String,

      default: "Waiting"

    },

    labourPrice: {

      type: Number,

      default: 0

    },

    customerDecision: {

      type: String,

      default: "Waiting"

    },

    feedback: {

      rating: {

        type: Number,

        default: 0

      },

      comment: {

        type: String,

        default: ""

      }

    }

  },

  { timestamps: true }

);

module.exports =
  mongoose.model(
    "Request",
    requestSchema
  );
// src/pages/LabourDashboard.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function LabourDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [requests, setRequests] =
    useState([]);

  const [price, setPrice] =
    useState({});

  useEffect(() => {

    getRequests();

  }, []);

  const getRequests = async () => {

    try {

      const res = await axios.get(

        `http://localhost:5000/api/request/labour/${user._id}`

      );

      setRequests(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const respondRequest =
    async (id, action) => {

      try {

        await axios.put(

          `http://localhost:5000/api/request/labour-response/${id}`,

          {
            price: price[id] || "",
            action
          }

        );

        getRequests();

      } catch (err) {

        console.log(err);

      }
    };

  return (

    <div style={styles.page}>

      <Navbar />

      <div style={styles.container}>

        <h2 style={styles.heading}>
          Incoming Requests
        </h2>

        {requests.length === 0 && (

          <p style={styles.empty}>
            No requests found
          </p>

        )}

        {requests.map((req) => (

          <div
            key={req._id}
            style={styles.card}
          >

            {/* TOP ROW */}

            <div style={styles.topRow}>

              <h3 style={styles.name}>
                {req.customerName}
              </h3>

              <span style={styles.statusBadge}>
                {req.status}
              </span>

            </div>

            {/* DETAILS */}

            <div style={styles.details}>

              <p>
                <b>Work:</b>
                {" "}
                {req.workType}
              </p>

              <p>
                <b>Location:</b>
                {" "}
                {req.location}
              </p>

              <p>
                <b>Date:</b>
                {" "}
                {req.date}
              </p>

              <p>
                <b>Customer Decision:</b>
                {" "}
                {req.customerDecision}
              </p>

            </div>

            {/* PRICE */}

            <input

              type="text"

              inputMode="numeric"

              placeholder="Enter Price (₹)"

              style={styles.input}

              value={price[req._id] || ""}

              onChange={(e) => {

                const value =
                  e.target.value.replace(/\D/g, "");

                setPrice({

                  ...price,

                  [req._id]: value

                });
              }}

            />

            {/* BUTTONS */}

            {req.status === "Pending" && (

              <div style={styles.buttonRow}>

                <button

                  style={styles.acceptBtn}

                  onClick={() =>
                    respondRequest(
                      req._id,
                      "Accepted"
                    )
                  }

                >

                  Accept

                </button>

                <button

                  style={styles.rejectBtn}

                  onClick={() =>
                    respondRequest(
                      req._id,
                      "Rejected"
                    )
                  }

                >

                  Reject

                </button>

              </div>

            )}

            {/* FEEDBACK */}

            {req.feedback &&
              req.feedback.rating > 0 && (

              <div style={styles.feedbackBox}>

                <div style={styles.starRow}>

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                    <span
                      key={star}
                      style={{

                        fontSize: "22px",

                        color:
                          req.feedback.rating >= star
                            ? "#f97316"
                            : "#4b5563"

                      }}
                    >

                      ★

                    </span>

                  ))}

                </div>

                <p style={styles.comment}>

                  {req.feedback.comment}

                </p>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

/* ================= UI ================= */

const styles = {

  page: {
    background: "#0b0f19",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial"
  },

  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "25px"
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    color: "white"
  },

  card: {
    background: "#111827",
    border: "1px solid #f97316",
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "18px"
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px"
  },

  name: {
    margin: 0,
    fontSize: "18px",
    color: "white"
  },

  statusBadge: {
    background: "#f97316",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold"
  },

  details: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    color: "#d1d5db",
    marginBottom: "16px",
    fontSize: "14px"
  },

  input: {
    width: "100%",
    height: "45px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #f97316",
    background: "#0f172a",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "14px",
    marginBottom: "14px"
  },

  buttonRow: {
    display: "flex",
    gap: "10px"
  },

  acceptBtn: {
    flex: 1,
    padding: "12px",
    background: "#f97316",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  rejectBtn: {
    flex: 1,
    padding: "12px",
    background: "#374151",
    border: "1px solid #4b5563",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  feedbackBox: {
    marginTop: "16px",
    background: "#0f172a",
    border: "1px solid #374151",
    borderRadius: "10px",
    padding: "14px"
  },

  starRow: {
    display: "flex",
    gap: "4px",
    marginBottom: "8px"
  },

  comment: {
    color: "#d1d5db",
    fontSize: "14px"
  },

  empty: {
    textAlign: "center",
    color: "#9ca3af"
  }

};
// src/pages/CustomerDashboard.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function CustomerDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [requests, setRequests] =
    useState([]);

  const [workers, setWorkers] =
    useState([]);

  const [form, setForm] =
    useState({

      workType: "",

      labourId: "",

      labourName: "",

      location: "",

      date: ""

    });

  const jobs = [

    "Electrician",
    "Plumber",
    "Painter",
    "Carpenter",
    "Cleaner",
    "Technician",
    "Welder",
    "Driver"

  ];

  useEffect(() => {

    getRequests();

  }, []);

  // ======================
  // GET REQUESTS
  // ======================

  const getRequests = async () => {

    try {

      const res = await axios.get(

        `http://localhost:5000/api/request/customer/${user.name}`

      );

      setRequests(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // ======================
  // SEARCH WORKERS
  // ======================

  const searchWorkers =
    async (workType) => {

      try {

        const res = await axios.get(

          "http://localhost:5000/api/auth/workers"

        );

        const filtered =
          res.data.filter((worker) =>

            worker.skills.includes(
              workType
            )

          );

        setWorkers(filtered);

      } catch (err) {

        console.log(err);

      }
    };

  // ======================
  // SEND REQUEST
  // ======================

  const sendRequest =
    async () => {

      if (

        !form.workType ||

        !form.labourId ||

        !form.location ||

        !form.date

      ) {

        return alert(
          "Please fill all fields"
        );
      }

      try {

        await axios.post(

          "http://localhost:5000/api/request/send",

          {

            customerName:
              user.name,

            customerId:
              user._id,

            labourId:
              form.labourId,

            labourName:
              form.labourName,

            workType:
              form.workType,

            location:
              form.location,

            date:
              form.date,

            timings:
              ["9AM - 12PM"]

          }

        );

        alert(
          "Request Sent Successfully"
        );

        setForm({

          workType: "",

          labourId: "",

          labourName: "",

          location: "",

          date: ""

        });

        setWorkers([]);

        getRequests();

      } catch (err) {

        console.log(err);

      }
    };

  // ======================
  // CUSTOMER DECISION
  // ======================

  const customerDecision =
    async (id, decision) => {

      try {

        await axios.put(

          `http://localhost:5000/api/request/customer-decision/${id}`,

          { decision }

        );

        getRequests();

      } catch (err) {

        console.log(err);

      }
    };

  // ======================
  // FEEDBACK
  // ======================

  const submitFeedback =
    async (
      id,
      rating,
      comment
    ) => {

      if (
        !rating ||
        !comment
      ) {

        return alert(
          "Please enter rating and review"
        );
      }

      try {

        await axios.put(

          `http://localhost:5000/api/request/feedback/${id}`,

          {

            rating:
              Number(rating),

            comment

          }

        );

        alert(
          "Feedback Submitted"
        );

        getRequests();

      } catch (err) {

        console.log(err);

        alert(
          "Feedback Failed"
        );

      }
    };

  return (

    <div style={styles.page}>

      <Navbar />

      <div style={styles.container}>

        {/* LEFT */}

        <div style={styles.leftCard}>

          <h2 style={styles.heading}>
            Hire Workers
          </h2>

          {/* WORK TYPE */}

          <select

            style={styles.input}

            value={form.workType}

            onChange={(e) => {

              setForm({

                ...form,

                workType:
                  e.target.value

              });

              searchWorkers(
                e.target.value
              );
            }}

          >

            <option value="">
              Select Work
            </option>

            {jobs.map(
              (job, index) => (

              <option
                key={index}
                value={job}
              >

                {job}

              </option>

            ))}

          </select>

          {/* WORKERS */}

          {workers.length > 0 && (

            <select

              style={styles.input}

              onChange={(e) => {

                const worker =
                  workers.find(

                    (w) =>
                      w._id ===
                      e.target.value

                  );

                setForm({

                  ...form,

                  labourId:
                    worker._id,

                  labourName:
                    worker.name

                });
              }}

            >

              <option>
                Select Worker
              </option>

              {workers.map(
                (worker) => (

                <option
                  key={worker._id}
                  value={
                    worker._id
                  }
                >

                  {worker.name}
                  {" - "}
                  {worker.city}

                </option>

              ))}

            </select>

          )}

          {/* LOCATION */}

          <input

            style={styles.input}

            placeholder="Enter Location"

            value={form.location}

            onChange={(e) =>
              setForm({

                ...form,

                location:
                  e.target.value

              })
            }

          />

          {/* DATE */}

          <input

            type="date"

            style={styles.input}

            value={form.date}

            onChange={(e) =>
              setForm({

                ...form,

                date:
                  e.target.value

              })
            }

          />

          <button

            style={styles.button}

            onClick={sendRequest}

          >

            Send Request

          </button>

        </div>

        {/* RIGHT */}

        <div style={styles.rightCard}>

          <h2 style={styles.heading}>
            My Requests
          </h2>

          {requests.length === 0 && (

            <p style={styles.empty}>
              No Requests Found
            </p>

          )}

          {requests.map((req) => (

            <div
              key={req._id}
              style={styles.requestBox}
            >

              <div style={styles.topRow}>

                <h3 style={styles.name}>
                  {req.labourName}
                </h3>

                <span style={styles.statusBadge}>
                  {req.status}
                </span>

              </div>

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
                  <b>Labour Response:</b>
                  {" "}
                  {req.labourResponse}
                </p>

                <p>
                  <b>Price:</b>
                  {" "}
                  ₹
                  {req.labourPrice}
                </p>

                <p>
                  <b>Customer Decision:</b>
                  {" "}
                  {req.customerDecision}
                </p>

              </div>

              {/* ACCEPT REJECT */}

              {req.labourResponse ===
                "Accepted" &&

                req.customerDecision ===
                  "Waiting" && (

                <div
                  style={
                    styles.btnRow
                  }
                >

                  <button

                    style={
                      styles.acceptBtn
                    }

                    onClick={() =>
                      customerDecision(
                        req._id,
                        "Accepted"
                      )
                    }

                  >

                    Accept

                  </button>

                  <button

                    style={
                      styles.rejectBtn
                    }

                    onClick={() =>
                      customerDecision(
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

              {req.customerDecision ===
                "Accepted" &&

                !req.feedback?.rating && (

                <div
                  style={
                    styles.feedbackSection
                  }
                >

                  {/* STAR RATING */}

                  <div style={styles.starRow}>

                    {[1, 2, 3, 4, 5].map((star) => (

                      <span
                        key={star}
                        onClick={() =>

                          setRequests(

                            requests.map((item) =>

                              item._id === req._id

                                ? {
                                    ...item,
                                    tempRating: star
                                  }

                                : item

                            )

                          )

                        }

                        style={{

                          fontSize: "28px",

                          cursor: "pointer",

                          color:

                            (req.tempRating || 0) >= star
                              ? "#f97316"
                              : "#4b5563"

                        }}
                      >

                        ★

                      </span>

                    ))}

                  </div>

                  <textarea

                    placeholder="Write Review"

                    style={
                      styles.textarea
                    }

                    onChange={(e) =>

                      setRequests(

                        requests.map(
                          (item) =>

                            item._id ===
                            req._id

                              ? {

                                  ...item,

                                  tempComment:
                                    e.target
                                      .value

                                }

                              : item

                        )

                      )
                    }

                  />

                  <button

                    style={
                      styles.feedbackBtn
                    }

                    onClick={() =>

                      submitFeedback(

                        req._id,

                        req.tempRating,

                        req.tempComment

                      )
                    }

                  >

                    Submit Rating

                  </button>

                </div>

              )}

              {/* SHOW FEEDBACK */}

              {req.feedback &&
                req.feedback.rating > 0 && (

                <div
                  style={
                    styles.feedbackBox
                  }
                >

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

                  <p style={styles.reviewText}>

                    {
                      req.feedback
                        .comment
                    }

                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    background: "#0b0f19",
    minHeight: "100vh",
    color: "white"
  },

  container: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "25px",
    padding: "30px",
    maxWidth: "1400px",
    margin: "auto"
  },

  leftCard: {
    background: "#111827",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid #f97316"
  },

  rightCard: {
    background: "#111827",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid #f97316"
  },

  heading: {
    marginBottom: "22px",
    color: "#ffffff",
    fontSize: "24px",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border:
      "1px solid #f97316",
    background: "#0f172a",
    color: "white",
    boxSizing: "border-box",
    outline: "none",
    fontSize: "14px"
  },

  textarea: {
    width: "100%",
    height: "90px",
    padding: "12px",
    borderRadius: "10px",
    border:
      "1px solid #f97316",
    background: "#0f172a",
    color: "white",
    resize: "none",
    marginBottom: "12px",
    boxSizing: "border-box",
    outline: "none",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#f97316",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold"
  },

  requestBox: {
    border:
      "1px solid #f97316",
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "18px",
    background: "#1f2937"
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px"
  },

  statusBadge: {
    background: "#f97316",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold"
  },

  name: {
    color: "white",
    margin: 0
  },

  details: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    color: "#d1d5db",
    marginBottom: "10px"
  },

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "14px"
  },

  acceptBtn: {
    flex: 1,
    padding: "11px",
    background: "#f97316",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  rejectBtn: {
    flex: 1,
    padding: "11px",
    background: "#374151",
    color: "white",
    border: "1px solid #4b5563",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  feedbackSection: {
    marginTop: "16px"
  },

  feedbackBtn: {
    width: "100%",
    padding: "12px",
    background: "#f97316",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  feedbackBox: {
    marginTop: "16px",
    background: "#0f172a",
    padding: "14px",
    borderRadius: "10px",
    border:
      "1px solid #374151"
  },

  starRow: {
    display: "flex",
    gap: "4px",
    marginBottom: "10px"
  },

  reviewText: {
    color: "#d1d5db",
    fontSize: "14px"
  },

  empty: {
    color: "#d1d5db"
  }

};
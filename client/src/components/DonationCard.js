import "./DonationCard.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUpdateDonationPost } from "state";

const Donation = ({ cardDetails }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [number, setNumber] = useState("");
  const [gatheredAmount, setGatheredAmount] = useState(0);

  const amountHandler = (e) => {
    const inputValue = parseInt(e.target.value);
    setNumber(inputValue);
  };

  const deleteDonationPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/donation/delete/${cardDetails?._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json(); // eslint-disable-line no-unused-vars
    } catch (err) {
      console.log(err);
      console.log("Error Occured While Deleting Donation Post");
    }
  };

  const updateDonationPost = async (updatedAmount) => {
    try {
      const response = await fetch(
        `http://localhost:3001/donation/update/${cardDetails?._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amountGained: updatedAmount }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setUpdateDonationPost(updatedPost));
    } catch (error) {
      console.error("Error updating donation post:", error);
    }
  };

  const checkout = async () => {
    if (number === 0) {
      alert("Please enter an amount");
      return;
    }

    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:3001/payment/getkey");

      const {
        data: { order },
      } = await axios.post("http://localhost:3001/payment/checkout", {
        amount: number,
      });
      const updatedAmount = Number(cardDetails?.amountGained) + Number(number);

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "ConnectHub",
        description: "Islamic Social Media App",
        image:
          "https://raw.githubusercontent.com/rahilahmed20/Salaam/c77282938dd52c51ec4a465e6b6be36443d7a0ec/client/public/assets/Salaam-logo.svg",
        order_id: order.id,
        callback_url: "http://localhost:3001/payment/paymentVerification",
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#2691CF",
        },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.success", function (response) {
        const updatedAmount = gatheredAmount + number;
        setGatheredAmount(updatedAmount);
      });

      updateDonationPost(updatedAmount);
      if (updatedAmount >= cardDetails?.price) {
        deleteDonationPost();
      }
      razor.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="cards-container">
      <div className="card">
        <div className="card-image">
          <img
            src={`http://localhost:3001/assets/${cardDetails?.picturePath}`}
            alt="masjid_Image"
            width={352}
            height={264}
            className="donation-image"
          />
        </div>
        <div className="card-details">
          <p className="name">{cardDetails?.name}</p>
          <p className="description">{cardDetails?.description}</p>
          <div style={{ width: "100%" }}>
            <p className="price"> Required: ₹{cardDetails?.price}</p>
            <p className="amountGained">
              Gathered: ₹{cardDetails?.amountGained}
            </p>
          </div>
          <p className="amount">
            Amount:{" "}
            <input
              type="text"
              placeholder="Enter the Amount"
              className="input-amount"
              value={number}
              onChange={amountHandler}
            />
          </p>
          <div className="buttonContainer">
            <button className="submitBtn" onClick={checkout}>
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;

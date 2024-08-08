import Navbar from "scenes/navbar";
import DonationCard from "../../components/DonationCard.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setDonationPosts } from "state";
import { Box } from "@mui/material";
import CreateDonation from "scenes/CreateDonationForm/index.js";
import TypeWriter from "components/TypeWriter.js";
import "./index.css";

const DonationPage = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const donationPosts = useSelector((state) => state.donationPosts);
  const user = useSelector((state) => state.user);

  const [create, setCreate] = useState(false);
  const [activeTab, setActiveTab] = useState("donate");

  const handleCreate = () => {
    setCreate(true);
    setActiveTab("create"); // Set active tab to "create"
  };

  const handleDonate = () => {
    setCreate(false);
    setActiveTab("donate"); // Set active tab to "donate"
  };

  const getDonationPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/donation/all", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setDonationPosts(data?.donations));
    } catch (err) {
      console.log(err);
      console.log("Error Occured While Fetching Donation Posts");
    }
  };

  useEffect(() => {
    getDonationPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <TypeWriter />
      {user?.role === "Admin" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            mt: "20px",
          }}
        >
          <button
            className={`donateBtn tab_Btn ${
              activeTab === "donate" ? "activeTab" : ""
            }`}
            onClick={handleDonate}
          >
            DONATE
          </button>
          <button
            className={`createBtn tab_Btn ${
              activeTab === "create" ? "activeTab" : ""
            }`}
            onClick={handleCreate}
          >
            CREATE
          </button>
        </Box>
      )}
      {create ? (
        <CreateDonation setCreate={setCreate} />
      ) : (
        <div className="container" id="container">
          {donationPosts &&
            donationPosts.map((post) => (
              <DonationCard cardDetails={post} key={post?._id} />
            ))}
        </div>
      )}
    </>
  );
};

export default DonationPage;

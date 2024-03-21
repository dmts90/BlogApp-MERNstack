import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../personelCard/personelCard.css";

function PersonelCard() {
  const [logIn, setLogIn] = useState({});
  const location = useLocation();
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        const data = response.data;
        const user = data.find(
          (item) => item._id === JSON.parse(localStorage.getItem("user"))
        );
        if (user) {
          setLogIn(user);
        }
      } catch (error) {
        console.error("Veri alınamadı", error);
      }
    }
    fetchUserData();
  }, []);
  return (
    <div className="personelCard">
      <div>
        <img src={logIn.image} alt="" />
        <h1>{logIn.fullname}</h1>
        <p>{logIn.aboutme}</p>
      </div>
      <div>
        {location.pathname === "/admin" ? (
          <a
            style={{
              color: "inherit",
            }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <i className="bi bi-house"></i>
          </a>
        ) : (
          <a
            style={{
              color: "inherit",
            }}
            onClick={() => {
              window.location.href = "/admin";
            }}
          >
            <i className="bi bi-person"></i>
          </a>
        )}

        <a
          target="_blank"
          style={{
            color: "inherit",
            display: logIn.facebook === undefined && "none",
          }}
          href={logIn.facebook}
        >
          <i className="bi bi-facebook"></i>
        </a>

        <a
          target="_blank "
          style={{
            color: "inherit",
            display: logIn.twitter === undefined && "none",
          }}
          href={logIn.twitter}
        >
          <i className="bi bi-twitter-x"></i>
        </a>

        <a
          target="_blank "
          style={{
            color: "inherit",
            display: logIn.linkedin === undefined && "none",
          }}
          href={logIn.linkedin}
        >
          <i className="bi bi-linkedin"></i>
        </a>

        <a
          target="_blank "
          style={{
            color: "inherit",
            display: logIn.instagram === undefined && "none",
          }}
          href={logIn.instagram}
        >
          <i className="bi bi-instagram"></i>
        </a>

        <a
          target="_blank "
          style={{
            color: "inherit",
            display: logIn.threads === undefined && "none",
          }}
          href={logIn.threads}
        >
          <i className="bi bi-threads"></i>
        </a>

        <a
          style={{
            color: "inherit",
          }}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          <i className="bi bi-box-arrow-right"></i>
        </a>
      </div>
    </div>
  );
}

export default PersonelCard;

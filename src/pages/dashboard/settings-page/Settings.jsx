import {  useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import profileImage from "./assets/profile-img.png";
import "./Settings.css";

gsap.registerPlugin(ScrollTrigger);

const Settings = () => {
  const fixedDivRef = useRef(null);

  return (
    <div className="settings-container">
      <div className="main-content">
        <div className="box">
          <div>
            <span className="section-title">Current Balance</span>
          </div>
        </div>
        <div className="box"></div>
        <div className="box"></div>
      </div>

      <div className="profile-card" ref={fixedDivRef}>
        <img src={profileImage} className="profile-image" alt="profile" />
        <div className="profile-name">
          <span className="section-title">s.n.sanjay</span>
        </div>
        <hr className="divider" />

        <div className="details">
          {/* Username */}
          <div className="info-row">
            <div className="icon icon-green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" />
              </svg>
            </div>
            <div className="info-text">
              <p className="label">Username</p>
              <p className="value">s.n.sanjay</p>
            </div>
          </div>

          {/* Email */}
          <div className="info-row">
            <div className="icon icon-red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z" />
              </svg>
            </div>
            <div className="info-text">
              <p className="label">Email</p>
              <p className="value">s.n.sanjay@gmail.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="info-row">
            <div className="icon icon-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821Z" />
              </svg>
            </div>
            <div className="info-text">
              <p className="label">Phone</p>
              <p className="value">9087654321</p>
            </div>
          </div>

          {/* Address */}
          <div className="info-row">
            <div className="icon icon-yellow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z" />
              </svg>
            </div>
            <div className="info-text">
              <p className="label">Address</p>
              <p className="value">2nd street, 1st block, 1st floor</p>
            </div>
          </div>
        </div>

        <div className="edit-button-wrapper">
          <button className="edit-button">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

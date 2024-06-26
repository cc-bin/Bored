import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ActivityModal.css";

import closeIcon from "../img/close.svg";
import refreshIcon from "../img/refresh_white.svg";
import shareIcon from "../img/share.svg";
import collectIcon from "../img/collect_white.svg";
import { activityShare } from "../utils/Utils";
import { showToast } from "./GlobalToast";

export default function ActivityModal({ isOpen, data, onClose, onRefresh }) {
  const [collectList, setCollectList] = useState([]);

  useEffect(() => {
    const savedDataList = localStorage.getItem("collectList");
    if (savedDataList) {
      setCollectList(JSON.parse(savedDataList));
    }
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="Activity-Modal-Content-Container">
        <div className="Activity-Modal-Content-Container2">
          <img
            src={closeIcon}
            className="Activity-Modal-Close"
            onClick={() => {
              onClose();
            }}
          />

          <p className="Activity-Modal-Title">Activity</p>
          <p className="Activity-Modal-SubText">{data.activity}</p>

          <div className="Activity-Modal-Main-Container">
            <p className="Activity-Modal-Title">Type</p>
            <p className="Activity-Modal-SubText">{data.type}</p>
          </div>

          <div className="Activity-Modal-Main-Container">
            <p className="Activity-Modal-Title">Expense level</p>
            <p className="Activity-Modal-SubText">{data.price}</p>
          </div>

          <div className="Activity-Modal-Main-Container">
            <p className="Activity-Modal-Title">Participants</p>
            <p className="Activity-Modal-SubText">{data.participants}</p>
          </div>

          <div className="Activity-Modal-Main-Container">
            <p className="Activity-Modal-Title">Accessibility</p>
            <p className="Activity-Modal-SubText">{data.accessibility}</p>
          </div>
        </div>
        <div className="Activity-Modal-Main-Container">
          <button
            className="Activity-Modal-LeftButton"
            onClick={() => {
              let newCollectList = [];
              if (collectList.length >= 50) {
                newCollectList = [...collectList.slice(1), data];
              } else {
                newCollectList = [...collectList, data];
              }
              console.log(JSON.stringify(newCollectList));
              setCollectList(newCollectList);
              localStorage.setItem(
                "collectList",
                JSON.stringify(newCollectList)
              );
              showToast("Collect success", "success");
            }}
          >
            <img src={collectIcon} className="Activity-Modal-Button-Icon" />
          </button>
          <div className="Activity-Modal-Button-Line" />
          <button className="Activity-Modal-CenterButton" onClick={onRefresh}>
            <img src={refreshIcon} className="Activity-Modal-Button-Icon" />
          </button>
          <div className="Activity-Modal-Button-Line" />
          <button
            className="Activity-Modal-RightButton"
            onClick={() => {
              activityShare(data);
            }}
          >
            <img src={shareIcon} className="Activity-Modal-Button-Icon" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "7.3rem",
    height: "auto",
    borderRadius: "12px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: "0px",
  },
};

const styles = {
  subText: {
    fontSize: "18px",
    color: "#000000",
  },
};

// src/components/WorldcoinVerification.jsx

import React from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import WorldcoinButton from "./WorldIDButton"; // Import the new button component

const WorldcoinVerification = ({ onVerify, isVerified }) => {
  // This function will call your backend to verify the proof.
  const verifyProof = async (proof) => {
    try {
      console.log("Proof received:", proof);
      await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proof }),
      });
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <IDKitWidget
      app_id="app_staging_94a57ff6be0c0cdf5b18827359ed4f59" // Replace with your app ID from Worldcoin
      action="verification"
      signal="unique_signal" // Replace with a unique signal (e.g., user ID)
      enableTelemetry={true}
      handleVerify={verifyProof} // Calls your verification server route
      verification_level={VerificationLevel.Device}
      onSuccess={onVerify} // Callback function on successful verification
    >
      {({ open }) => (
        <WorldcoinButton onClick={open} isVerified={isVerified} />
      )}
    </IDKitWidget>
  );
};

export default WorldcoinVerification;

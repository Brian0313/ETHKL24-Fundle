// src/pages/CreateCampaign.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useCrowdfunding } from "../context";

import { CustomButton, FormField, Loader, WorldcoinVerification } from "../components";
import { checkIfImage } from "../utils";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useCrowdfunding();
  const [isVerified, setIsVerified] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    deadline: "",
    image: "",
    target: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    alert("Worldcoin verification successful! You can now submit the campaign.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Please complete Worldcoin verification before submitting.");
      return;
    }

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide a valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-[#1c2c39] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>


      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>
        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />
        <div className="flex items-center justify-between mt-[40px]">
          <div className="flex-grow">
            <WorldcoinVerification
              onVerify={handleVerificationSuccess}
              isVerified={isVerified}
            />
          </div>
          <div className="ml-4">
            <CustomButton
              btnType="submit"
              title="Submit new Campaign"
              styles="bg-[#1dc071]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;

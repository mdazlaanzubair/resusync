import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100vh] flex flex-col gap-2 items-center justify-center text-center bg-secondary">
      <h1 className="text-4xl font-bold">
        Hello world! Welcome to <span className="text-primary">ResuSync</span>
      </h1>
      <p className="text-xl">
        It helps you to evaluate you resume using AI and some custom resume
        parsing algorithms
      </p>
      <Button
        size="large"
        title="Get Started"
        type="primary"
        onClick={() => navigate("/dashboard")}
      >
        Get started
      </Button>
    </div>
  );
};

export default HomePage;

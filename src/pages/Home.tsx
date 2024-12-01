import React from "react";
import WecomeImage from "../assets/images/welcome image.jpg"

const Home: React.FC = () => {
  return (
    <>
      <div>
        <img className="h-screen" src={WecomeImage} alt="Welcome Image" />
      </div>
    </>
  );
};

export default Home;

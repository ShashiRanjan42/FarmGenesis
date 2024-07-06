import React, { useContext } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import Footer from "./Footer";
import cards from "../../assets/json/cards";
import SignUpContext from "../../contexts/SignUpContext/SignUpContext";
import SignInContext from "../../contexts/SignInContext/SignInContext";

const LandingPage = () => {
  const signupcontext = useContext(SignUpContext);
  const { showSignUp } = signupcontext;
  const signincontext = useContext(SignInContext);
  const { showSignIn } = signincontext;
  return (
    <>
      <div className="min-h-screen bg-cover bg-center" style={{
        backgroundImage: "url('/elements.png')"
      }}>
        <Navbar />
        <Header showSignUp={showSignUp} showSignIn={showSignIn} />
      </div>
      <CardSection />
      <Footer />
    </>
  );
};

const Header = ({ showSignUp, showSignIn }) => {
  return (
    <div className="flex items-end min-h-screen p-10 lg:p-24">
      <div className="flex flex-col">
        <h2 className="text-5xl lg:text-8xl text-green-200">FarmGenesis</h2>
        <h3 className="text-2xl lg:text-4xl text-green-400">A one stop solution for a farmer</h3>
        <div className="mt-6 flex flex-col sm:flex-row">
        <button className="text-white border border-green-600 py-2 px-6 rounded shadow-lg hover:bg-green-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 mr-4 mb-4 sm:mb-0" onClick={showSignIn}>
          Sign In
        </button>
        <button className="text-white border border-green-600 py-2 px-6 rounded shadow-lg hover:bg-green-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 mr-4 mb-4 sm:mb-0" onClick={showSignUp}>
          Sign Up
        </button>



      </div>
      </div>
    </div>
  );
};

const CardSection = () => {
  return (
    <div className="px-10 lg:px-24 py-10">
      <h2 className="text-3xl text-center mb-8">We are here to help you in -&gt;</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          return <Card key={index} data={card} />;
        })}
      </div>
    </div>
  );
};

export default LandingPage;

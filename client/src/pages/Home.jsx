import React from "react";
import Banner from "../components/home/Banner";
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import Testimonial from "../components/home/Testimonial";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div className="bg-white text-slate-800">
      <Banner />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow">
        
        <Hero />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

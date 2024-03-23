import Development from "@/components/Development";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <main className="px-8 md:px-16">
        <Development />
      </main>
      <Footer />
    </>
  );
};

export default page;

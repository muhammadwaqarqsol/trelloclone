import React from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    //layout for root page
    <div className="h-full bg-slate-100">
      {/* navbar component */}
      <Navbar />
      <main className="pt-20">{children}</main>
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default MarketingLayout;

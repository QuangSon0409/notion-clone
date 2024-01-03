import React from "react";
import Navbar from "./_component/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (<>
        <div className="h-full">
            <Navbar />
            <main className="h-full pt-36">{children}</main>
        </div>
    </>);
}

export default MarketingLayout;
"use client"

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import Navigation from "./_component/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, isLoading } = useConvexAuth();
    if (isLoading) {
        return <div className="h-full flex justify-center items-center">
            <Spinner size="lg" />
        </div>
    }
    if (!isAuthenticated) {
        return redirect("/")
    }
    return (<>
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="h-full flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    </>);
}

export default MainLayout;
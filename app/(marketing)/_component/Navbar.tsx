"use client"
import { useScrollTop } from "@/hook/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";

const Navbar = () => {
    const scrolled = useScrollTop();
    // const { isAuthenticated, isLoading } = useConvexAuth()
    return (<>
        <div className={cn("z-50 fixed bg-background flex items-center top-0 w-full p-6", scrolled && "border-b shadow-sm")}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between items-center gap-x-2 w-full flex">
                {/* {isLoading && (<>Loading</>)} */}
                <ModeToggle />
            </div>
        </div>
    </>);
}

export default Navbar;
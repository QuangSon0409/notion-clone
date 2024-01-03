"use client"
import { useScrollTop } from "@/hook/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
    const scrolled = useScrollTop();
    return (<>
        <div className={cn("z-50 fixed bg-background flex items-center top-0 w-full p-6", scrolled && "border-b shadow-sm")}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between items-center gap-x-2 w-full flex">
                <ModeToggle />
            </div>
        </div>
    </>);
}

export default Navbar;
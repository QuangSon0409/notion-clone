"use client"
import { cn } from "@/lib/utils";
import { ChevronLeft, MenuIcon, PlusCircle, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./user-item";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./sidebar-item";
import { toast } from "sonner";

const Navigation = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const documents = useQuery(api.document.get);
    // console.log("documents:", documents)
    const create = useMutation(api.document.create);


    const pathname = usePathname()

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);

    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobile);
    // console.log(isMobile);
    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    }
    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return
        let newWidth = e.clientX
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;
        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100 % -${newWidth}px`)
        }
        // console.log("newWidth: " + newWidth)

    }
    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const collapse = () => {
        if (navbarRef.current && sidebarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);
            sidebarRef.current.style.width = '0px'
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0px");
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const resetWidth = () => {
        if (navbarRef.current && sidebarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)"
            )
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            )
            setTimeout(() => setIsResetting(false), 300);
        }
    }
    // const resetWidth = () => {
    //     if (sidebarRef.current && navbarRef.current) {
    //         setIsCollapsed(false);
    //         setIsResetting(true);

    //         sidebarRef.current.style.width = isMobile ? "100%" : "240px";
    //         navbarRef.current.style.setProperty(
    //             "width",
    //             isMobile ? "0" : "calc(100% - 240px)"
    //         );
    //         navbarRef.current.style.setProperty(
    //             "left",
    //             isMobile ? "100%" : "240px"
    //         );
    //         setTimeout(() => setIsResetting(false), 300);
    //     }
    // };
    const handleCreate = () => {
        const promise = create({ title: "United" });
        toast.promise(promise, {
            success: "New Note created",
            loading: "Loading create note ...",
            error: "Fail to create"
        })
    }
    useEffect(() => {
        if (isMobile) {
            setIsCollapsed(true)
            collapse();
        } else {
            setIsCollapsed(false)
            resetWidth()
        }
    }, [isMobile])
    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    return (<>
        <aside
            ref={sidebarRef}
            className={cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[9999]",
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "w-0"
            )}>
            <div role="button" onClick={collapse} className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition", isMobile && "opacity-100")}>
                <ChevronLeft className="h-6 w-6" />
            </div>
            <div>
                <UserItem />
                <Item title="Setting" onClick={() => { }} icon={Settings} />
                <Item title="Search ..." onClick={() => { }} isSearch icon={Search} />
                <Item title="New Page" onClick={handleCreate} icon={PlusCircle} />
            </div>
            <div className="mt-4">
                {documents?.map((document) => {
                    return <>
                        <p key={document._id}>
                            {document.title}
                        </p>
                    </>
                })}
            </div>
            <div onMouseDown={handleMouseDown} onClick={resetWidth} className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />


        </aside>
        <div
            ref={navbarRef}
            className={cn(
                "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "left-0 w-full"
            )}
        >

            <nav className="bg-transparent px-3 py-4 w-full" onClick={resetWidth}>
                {isCollapsed && <MenuIcon role="button" className="w-6 h-6 text-muted-foreground" />}
            </nav>
        </div>
    </>);
}

export default Navigation;
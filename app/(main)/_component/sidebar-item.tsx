// import React from 'react'

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRightIcon, LucideIcon } from "lucide-react";

interface ItemProps {
    id?: Id<"documents">,
    level?: number;
    expanded?: boolean;
    documentIcon?: string;
    active?: boolean;
    isSearch?: boolean;
    onExpand?: () => void;
    title: string;
    onClick: () => void;
    icon: LucideIcon;
}
export const Item = ({ title, onClick, icon: Icon, id, level = 0, expanded, isSearch, onExpand, active, documentIcon }: ItemProps) => {
    const ChevronIcon = expanded ? ChevronDown : ChevronRightIcon;

    const handleExpand = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.()

    }
    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: level ? `${(level * 12) + 12}px` : "12px" }}
            className={cn("group min-h-[27px] text-sm text-muted-foreground hover:bg-primary/5 flex items-center w-full py-1 pr-3", active && "bg-primary text-primary")}
        >
            {!!id && (
                <>
                    <div role="button" className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-500 mr-1" onClick={handleExpand}>
                        <ChevronIcon className="w-4 h-4 shrink-0 text-muted-foreground/50" />
                    </div>
                </>
            )}
            {

            }
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <Icon
                    className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"
                />
            )}
            <span className="truncate">
                {title}
            </span>
            {isSearch && (<>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>

            </>)}

        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}


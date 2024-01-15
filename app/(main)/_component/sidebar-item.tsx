// import React from 'react'

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRightIcon, LucideIcon, Plus } from "lucide-react";
import { toast } from "sonner";

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
    const create = useMutation(api.document.create)
    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!id) return;

        const promise = create({ title: "Untitled", parentDocument: id });
        toast.promise(promise, {
            loading: "Create a new note ...",
            success: "New note created",
            error: "Fail to create a new note"

        })

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
            {!!id && (
                <div className="ml-auto flex items-center gap-x2" role="button" onClick={onCreate}>

                    <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-500">
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )}

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


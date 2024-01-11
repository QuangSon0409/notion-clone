"use client"

import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Item } from "./sidebar-item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";


interface IDocumentProps {
    parentDocumentId?: Id<"documents">,
    level?: number,
    data?: Doc<"documents">
}

const DocumentList = ({ parentDocumentId, level = 0 }: IDocumentProps) => {
    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const onExpand = (documentId: string) => {
        setExpanded((preventExpanded) => ({
            ...preventExpanded,
            [documentId]: !preventExpanded[documentId]
        }))
    }
    const documents = useQuery(api.document.getSidebar, {
        parentDocument: parentDocumentId
    })
    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    if (documents === undefined) {
        return (<>
            <Item.Skeleton level={level} />
            {level === 0 && (
                <>
                    <Item.Skeleton level={level} />
                    <Item.Skeleton level={level} />
                </>
            )}
        </>)
    }
    return (<>
        <p style={{
            paddingLeft: level ? `$({level * 12} + 25)px` : undefined
        }}
            className={cn("hidden text-sm text-muted-foreground/50", expanded && "last:block", level === 0 && "hidden")}
        >
            No pages inside
        </p>
        {documents.map((document) => {
            return (
                <div key={document._id}>
                    <Item
                        id={document._id}
                        icon={FileIcon}
                        onClick={() => { onRedirect(document._id) }}
                        title={document.title}
                        documentIcon={document.icon}
                        active={params.documentId === document._id}
                        level={level}
                        onExpand={() => onExpand(document._id)}
                        expanded={expanded[document._id]} />
                    {
                        expanded[document._id] && (
                            <DocumentList
                                parentDocumentId={document._id}
                                level={level + 1}
                            />
                        )
                    }
                </div>
            )

        })}
    </>);
}

export default DocumentList;
"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api"
import Image from "next/image";
import { toast } from "sonner";

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.document.create);

    const onCreate = () => {
        const promise = create({ title: "Untitled" });
        toast.promise(promise, {
            loading: "Create a new note ...",
            success: "New note created",
            error: "Fail to create a new note"

        })
    }
    return (<>
        <div className="h-full flex flex-col justify-center items-center space-y-4">
            <Image src="/empty.png" height="300" width="300" className="dark:hidden" alt="Empty" />
            <Image src="/empty-dark.png" height="300" width="300" className="hidden dark:block" alt="Empty" />
            <h2>Welcome to {user?.username}&apos;s Notion</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Notion
            </Button>
        </div>
    </>);
}

export default DocumentsPage;
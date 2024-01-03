import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeadingPage = () => {
    return (<>
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your Ideas, Document, & Plans. Unified. Welcome to <span className="underline">Notion Clone</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Notion Clone is the connected workspace where <br /> better, faster work happens
            </h3>
            <Button>
                Enter Notion Clone <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
    </>);
}

export default HeadingPage;
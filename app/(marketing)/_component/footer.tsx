import { Button } from "@/components/ui/button";
import Logo from "./logo";

const FooterPage = () => {
    return (<>
        <div className="flex items-center w-full bg-background z-50">
            <Logo />
            <div className="flex md:ml-auto w-full md:justify-end items-center justify-between gap-x-2">
                <Button size="sm" variant="ghost">Privacy Policy </Button>
                <Button size="sm" variant="ghost">Terms & Conditions</Button>
            </div>
        </div>
    </>);
}

export default FooterPage;
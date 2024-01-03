import { useEffect, useState } from "react"

export const useScrollTop = (threshold = 10) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    useEffect(() => {
        const handleScrollTop = () => {
            if (window.scrollY > threshold) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", handleScrollTop)
        return () => window.removeEventListener("scroll", handleScrollTop)
    }, [threshold])
    return scrolled
}
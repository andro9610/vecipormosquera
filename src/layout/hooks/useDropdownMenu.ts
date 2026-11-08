import { useState } from "react";

export const useDropdownMenu = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return { isMobileMenuOpen, setIsMobileMenuOpen };
};

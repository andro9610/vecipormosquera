import { useState } from "react";

export const useDropdownMenu = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getNavClassName = ({ isActive }: { isActive: boolean }) => `dropdown-item ${isActive ? "nav-link-active" : ""}`;

    return {isMobileMenuOpen, setIsMobileMenuOpen, getNavClassName};
}
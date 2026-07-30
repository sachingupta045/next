export interface NavItem {
    name: string;
    href: string;
    id: string;
}


export interface NavbarProps {
    activeNav: string;
    setActiveNav: (id: string) => void;
    onItemClick?: () => void;
    isMobile?: boolean;
}
export interface QuickLink {
    label: string;
    href: string;
}

export interface ContactDetail {
    id: string;
    icon: string;
    title: string;
    text: string;
    href?: string;
}

export interface SocialLink {
    name: string;
    icon: string;
    href: string;
}

export const footerBrand = {
    name: "Sarab",
    prefix: "Sar",
    highlight: "ab",
    description: "We bring the world's finest flavors together in a fast, friendly, and affordable experience. Every meal crafted with love.",
};

export const footerQuickLinks: QuickLink[] = [
    { label: "Home", href: "#hero" },
    { label: "About Us", href: "#about" },
    { label: "Our Menu", href: "#menu" },
    { label: "Reservation", href: "#reservation" },
    { label: "Blog", href: "#brand-history" },
    { label: "Contact", href: "#contact" },
];

export const footerMenuLinks: QuickLink[] = [
    { label: "Burgers", href: "#menu" },
    { label: "Pizza", href: "#menu" },
    { label: "Fried Chicken", href: "#menu" },
    { label: "Wraps & Rolls", href: "#menu" },
    { label: "Pasta", href: "#menu" },
    { label: "Desserts", href: "#menu" },
];

export const footerContactInfo: ContactDetail[] = [
    {
        id: "address",
        icon: "fas fa-map-marker-alt",
        title: "Address",
        text: "42 Flavor Street, Manhattan, NY 10001",
        href: "https://maps.google.com",
    },
    {
        id: "phone",
        icon: "fas fa-phone-alt",
        title: "Phone",
        text: "+1 (800) 123-4567",
        href: "tel:+18001234567",
    },
    {
        id: "email",
        icon: "fas fa-envelope",
        title: "Email",
        text: "hello@sarabfood.com",
        href: "mailto:hello@sarabfood.com",
    },
    {
        id: "hours",
        icon: "fas fa-clock",
        title: "Hours",
        text: "Wed - Sun: 09 AM - 11 PM",
    },
];

export const footerSocialLinks: SocialLink[] = [
    { name: "Facebook", icon: "fab fa-facebook-f", href: "#" },
    { name: "Instagram", icon: "fab fa-instagram", href: "#" },
    { name: "Twitter", icon: "fab fa-x-twitter", href: "#" },
    { name: "YouTube", icon: "fab fa-youtube", href: "#" },
    { name: "TikTok", icon: "fab fa-tiktok", href: "#" },
];

export const footerLegalLinks: QuickLink[] = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
];

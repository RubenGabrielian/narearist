import { useState } from 'react';
import MobileMenuOverlay from './MobileMenuOverlay';

const navLinks = [
    { href: '/gallery', label: 'Պատկերասրահ', key: 'gallery' },
    { href: '/#discussions', label: 'Քննարկումների սենյակ', key: 'discussions' },
    { href: '/about-author', label: 'Հեղինակի մասին', key: 'about' },
    { href: '/about-author#contact', label: 'Կապ', key: 'contact' },
    { href: 'https://ko-fi.com/tennisacademy', label: 'Աջակցել նախագծին', key: 'support' },
];

export default function SiteNav({ activePage, mobileTitle }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center justify-center gap-8 md:gap-12">
                        {navLinks.map((link) => (
                            <a
                                key={link.key}
                                href={link.href}
                                className={`text-sm md:text-base font-medium transition-colors duration-200 px-3 py-2 rounded-md ${
                                    activePage === link.key
                                        ? 'text-white bg-white/10'
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-center justify-between">
                        {mobileTitle && (
                            <h1 className="text-white text-2xl font-semibold tracking-wide">
                                {mobileTitle}
                            </h1>
                        )}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`text-white/90 hover:text-white transition-colors p-2 rounded-md ${!mobileTitle ? 'ml-auto' : ''}`}
                            aria-label="Toggle menu"
                        >
                            <svg width="40" height="40" viewBox="0 0 112 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_4074_686)">
                                    <circle cx="56" cy="56" r="56" fill="#DB3106" />
                                    <rect x="28" y="45" width="56.7871" height="8.34043" fill="white" />
                                    <rect x="28" y="59" width="56.7871" height="8.34043" fill="white" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_4074_686" x="0" y="0" width="112" height="117" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4074_686" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4074_686" result="shape" />
                                    </filter>
                                </defs>
                            </svg>          
                        </button>
                    </div>
                </div>
            </nav>

            <MobileMenuOverlay isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}

import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MobileMenuOverlay from '../Components/MobileMenuOverlay';
import SiteFooter from '../Components/SiteFooter';

export default function AboutAuthor() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="Հեղինակի մասին" />

            {/* Navigation Menu - Sticky (same as Welcome) */}
            <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center justify-center gap-8 md:gap-12">
                        <a
                            href="/gallery"
                            className="text-white/90 text-sm md:text-base font-medium hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10"
                        >
                            պատկերասրահ
                        </a>
                        <a
                            href="/#discussions"
                            className="text-white/90 text-sm md:text-base font-medium hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10"
                        >
                            Քննարկումների սենյակ
                        </a>
                        <a
                            href="/about-author"
                            className="text-white/90 text-sm md:text-base font-medium hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10"
                        >
                            Հեղինակի մասին
                        </a>
                        <a
                            href="/about-author#contact"
                            className="text-white/90 text-sm md:text-base font-medium hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10"
                        >
                            Կապ
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center justify-between">
                        <h1 className="text-white text-2xl font-semibold tracking-wide">
                            ՀԵՂԻՆԱԿԻ ՄԱՍԻՆ
                        </h1>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white/90 hover:text-white transition-colors p-2 rounded-md"
                            aria-label="Toggle menu"
                        >
                            <svg width="40" height="40" viewBox="0 0 112 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_4074_686)">
                                    <circle cx="56" cy="56" r="56" fill="#DB3106" />
                                    <rect x="28" y="45" width="56.7871" height="8.34043" fill="white" />
                                    <rect x="28" y="59" width="56.7871" height="8.34043" fill="white" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_4074_686" x="0" y="0" width="112" height="117" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
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

            {/* Main Content - About Author layout */}
            <main className="bg-white py-16 md:py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Author name title */}
                    <h1 className="text-center font-bokonique text-4xl md:text-5xl lg:text-6xl text-black mb-12 tracking-wide">
                        ՆԱՐԵ ԱՐԻՍ
                    </h1>

                    {/* Author intro: image (left) + text (right) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
                        {/* Left: author image */}
                        <div className="w-full md:order-1">
                            <div className="overflow-hidden">
                                <img
                                    src="/images/author.png"
                                    alt="Նարէ Արիս"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right: author text */}
                        <div className="text-slate-800 leading-relaxed text-base md:text-lg md:order-2">
                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <p className="mb-4">
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </p>
                        </div>
                    </div>

                    {/* Contact form title */}
                    <h2 id="contact" className="font-bokonique text-center md:text-left text-2xl md:text-3xl text-black mb-4">
                        ԿԱՊՎԻՐ ԻՆՁ ՀԵՏ
                    </h2>

                    {/* Contact form card */}
                    <section className="bg-[#DB3106] rounded-[32px] px-6 sm:px-10 py-10 sm:py-12 text-black">
                        <form className="space-y-4 max-w-4xl mx-auto">
                            <input
                                type="text"
                                placeholder="Անուն, ազգանուն"
                                className="w-full rounded-[6px] bg-[white] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
                            />
                            <input
                                type="text"
                                placeholder="Քեզ հոգնող կարծիքը"
                                className="w-full rounded-[6px] bg-[white] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
                            />
                            <input
                                type="email"
                                placeholder="@էլ ․ հասցե"
                                className="w-full rounded-[6px] bg-[white] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
                            />
                            <textarea
                                rows={5}
                                placeholder="Նամակ գրի այստեղ..."
                                className="w-full rounded-[6px] bg-[white] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30 resize-none"
                            />

                            <div className="pt-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-15 py-3 rounded-full bg-white text-black font-bokonique text-sm md:text-base tracking-wide hover:bg-[#FEEFE9] transition-colors"
                                    style={{ boxShadow: '-3px 4px 0 2px rgba(0, 0, 0, 0.85)' }}
                                >
                                    ՈւՂԱՐԿԵԼ
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>

            <SiteFooter />
        </>
    );
}


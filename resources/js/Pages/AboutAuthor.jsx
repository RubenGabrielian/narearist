import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Facebook, Instagram, Menu, Music4, Send, X, Youtube } from 'lucide-react';

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
                            href="#"
                            className="text-white/90 text-sm md:text-base font-medium hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10"
                        >
                            Պատկերասրահ
                        </a>
                        <a
                            href="#"
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
                            href="#"
                            className="text-white/90 text-sm md:text-base font-medium hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10"
                        >
                            Կապ
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex justify-end">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white/90 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
                        <div className="flex flex-col">
                            <a
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white/90 text-base font-medium hover:text-white transition-colors duration-200 px-4 py-3 border-b border-white/10 hover:bg-white/10"
                            >
                                Պատկերասրահ
                            </a>
                            <a
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white/90 text-base font-medium hover:text-white transition-colors duration-200 px-4 py-3 border-b border-white/10 hover:bg-white/10"
                            >
                                Քննարկումների սենյակ
                            </a>
                            <a
                                href="/about-author"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white/90 text-base font-medium hover:text-white transition-colors duration-200 px-4 py-3 hover:bg-white/10"
                            >
                                Հեղինակի մասին
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content - About Author layout */}
            <main className="bg-white py-16 md:py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Author name title */}
                    <h1 className="text-center font-bokonique text-4xl md:text-5xl lg:text-6xl text-black mb-12 tracking-wide">
                        ՆԱՐԷ ԱՐԻՍ
                    </h1>

                    {/* Author intro: image (left) + text (right) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
                        {/* Left: author image */}
                        <div className="w-full md:order-1">
                            <div className="rounded-[24px] overflow-hidden border border-black/10 shadow-md">
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
                    <h2 className="font-bokonique text-2xl md:text-3xl text-black mb-4">
                        Կապվիր ինձ հետ
                    </h2>

                    {/* Contact form card */}
                    <section className="bg-[#DB3106] rounded-[32px] px-6 sm:px-10 py-10 sm:py-12 text-black">
                        <form className="space-y-4 max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Անուն, ազգանուն"
                                className="w-full rounded-[12px] bg-[#FEEFE9] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
                            />
                            <input
                                type="text"
                                placeholder="Քեզ հոգնող կարծիքը"
                                className="w-full rounded-[12px] bg-[#FEEFE9] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
                            />
                            <input
                                type="email"
                                placeholder="@էլ ․ հասցե"
                                className="w-full rounded-[12px] bg-[#FEEFE9] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
                            />
                            <textarea
                                rows={5}
                                placeholder="Նամակ գրի այստեղ..."
                                className="w-full rounded-[12px] bg-[#FEEFE9] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30 resize-none"
                            />

                            <div className="pt-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-10 py-3 rounded-full bg-white border-2 border-black text-black font-bokonique text-sm md:text-base tracking-wide shadow-md hover:bg-[#FEEFE9] transition-colors"
                                >
                                    ՈւՂԱՐԿԵԼ
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>

            {/* Shared footer from Welcome page */}
            <footer className="relative bg-[#DB3106] text-white py-12 overflow-hidden">
                <div className="max-w-8xl mx-auto px-20 sm:px-20 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* Footer Content */}
                        <div>
                            <nav className="space-y-5">
                                <a href="/about-author" className="block hover:text-yellow-200 transition-colors text-sm">
                                    Հեղինակի մասին
                                </a>
                                <a href="#" className="block hover:text-yellow-200 transition-colors text-sm">
                                    Պատկերասրահ
                                </a>
                                <a href="#" className="block hover:text-yellow-200 transition-colors text-sm">
                                    Քննարկումների սենյակ
                                </a>
                                <a href="#" className="block hover:text-yellow-200 transition-colors text-sm">
                                    Կապ
                                </a>
                            </nav>
                        </div>

                        {/* Email Subscription - Center */}
                        <div className="flex justify-center md:w-[434px]">
                            <div className="flex flex-col">
                                <form className="w-full max-w-md">
                                    <div className="relative flex items-center">
                                        <input
                                            type="email"
                                            placeholder="Գրանցվի՛ր, որ նորություններից հետ չմնաս"
                                            className="w-full px-4 py-3 pr-12 rounded-full bg-white backdrop-blur-sm border border-white/20 text-black placeholder-black/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all placeholder:text-sm"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                            aria-label="Submit email"
                                        >
                                            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.80811 15.5L9.55811 7.75L1.80811 0L-0.000227694 1.80833L5.94144 7.75L-0.000227694 13.6917L1.80811 15.5Z" fill="black" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>

                                {/* Social icons */}
                                <div className="mt-10 flex items-center gap-3">
                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#DB3106] hover:bg-[#B9EB0C] hover:text-[#DB3106] transition-colors shadow-md"
                                    >
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                    <a
                                        href="#"
                                        aria-label="Telegram"
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#DB3106] hover:bg-[#B9EB0C] hover:text-[#DB3106] transition-colors shadow-md"
                                    >
                                        <Send className="w-6 h-6" />
                                    </a>
                                    <a
                                        href="#"
                                        aria-label="TikTok"
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#DB3106] hover:bg-[#B9EB0C] hover:text-[#DB3106] transition-colors shadow-md"
                                    >
                                        <Music4 className="w-6 h-6" />
                                    </a>
                                    <a
                                        href="#"
                                        aria-label="Facebook"
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#DB3106] hover:bg-[#B9EB0C] hover:text-[#DB3106] transition-colors shadow-md"
                                    >
                                        <Facebook className="w-6 h-6" />
                                    </a>
                                    <a
                                        href="#"
                                        aria-label="YouTube"
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#DB3106] hover:bg-[#B9EB0C] hover:text-[#DB3106] transition-colors shadow-md"
                                    >
                                        <Youtube className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Simple copyright */}
                        <div className="flex items-end justify-end">
                            <p className="text-sm opacity-90">
                                Copyright © {new Date().getFullYear()} © All Rights Reserved By Naré Arist
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}


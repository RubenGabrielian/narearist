import { X } from 'lucide-react';

export default function MobileMenuOverlay({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="mobile-menu-panel md:hidden fixed inset-x-3 top-10 z-[80] bg-white border-2 border-black rounded-xl">
            <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="absolute -top-[18px] right-[11px] w-[38px] h-[38px] rounded-full bg-[#DB3106] text-white flex items-center justify-center"
                style={{ boxShadow: '0px 3px 0px 0px #000000' }}
            >
                <X className="w-8 h-8" />
            </button>

            <div className="h-full flex flex-col pt-16">
                <a
                    href="/"
                    onClick={onClose}
                    className="text-[#111111] text-[27px] font-semibold px-6 py-6 border-b border-black/60"
                >
                    ԳԼԽԱՎՈՐ ԷՋ
                </a>
                <a
                    href="/about-author"
                    onClick={onClose}
                    className="text-[#111111] text-[27px] font-semibold px-6 py-7 border-b border-black/60"
                >
                    ՀԵՂԻՆԱԿԻ ՄԱՍԻՆ
                </a>
                <a
                    href="/gallery"
                    onClick={onClose}
                    className="text-[#111111] text-[27px] font-semibold px-6 py-6 border-b border-black/60"
                >
                    ՊԱՏԿԵՐԱՍՐԱՀ
                </a>
                <a
                    href="/#discussions"
                    onClick={onClose}
                    className="text-[#111111] text-[27px] font-semibold px-6 py-6 border-b border-black/60"
                >
                    ՔՆՆԱՐԿՈՒՄՆԵՐԻ ՍԵՆՅԱԿ
                </a>
                <a
                    href="/about-author#contact"
                    onClick={onClose}
                    className="text-[#111111] text-[27px] font-semibold px-6 py-6 border-b border-black/60"
                >
                    ԿԱՊ
                </a>

                <div className="mt-auto px-6 py-10">
                    <div className="grid grid-cols-5 items-center gap-3 justify-items-center">
                        <a href="#" aria-label="Instagram" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/Instagram_menu.png" alt="Instagram" className="h-full w-full object-cover" />
                        </a>
                        <a href="#" aria-label="Telegram" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/telegram_menu.png" alt="Telegram" className="h-full w-full object-cover" />
                        </a>
                        <a href="#" aria-label="TikTok" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/tiktok_menu.png" alt="TikTok" className="h-full w-full object-cover" />
                        </a>
                        <a href="#" aria-label="Facebook" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/facebook_menu.png" alt="Facebook" className="h-full w-full object-cover" />
                        </a>
                        <a href="#" aria-label="YouTube" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/youtube_menu.png" alt="YouTube" className="h-full w-full object-cover" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

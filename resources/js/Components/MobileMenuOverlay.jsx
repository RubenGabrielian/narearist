import { X } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export default function MobileMenuOverlay({ isOpen, onClose }) {
    const { url } = usePage();

    if (!isOpen) return null;

    const currentPath = url.split('?')[0];
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

    const isHomeActive = currentPath === '/' && currentHash !== '#discussions';
    const isAboutActive = currentPath === '/about-author' && currentHash !== '#contact';
    const isGalleryActive = currentPath === '/gallery';
    const isDiscussionsActive = currentPath === '/' && currentHash === '#discussions';
    const isContactActive = currentPath === '/about-author' && currentHash === '#contact';

    const menuLinkClass = (isActive, paddingClass = 'py-6') =>
        `${isActive ? 'text-gray-400' : 'text-[#111111]'} text-[27px] font-semibold px-6 ${paddingClass} border-b border-black/60`;

    return (
        <div className="mobile-menu-panel md:hidden fixed inset-x-3 top-8 z-[80] bg-white border-2 border-black rounded-xl">
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
                    className={menuLinkClass(isHomeActive)}
                >
                    ԳԼԽԱՎՈՐ
                </a>
                <a
                    href="/about-author"
                    onClick={onClose}
                    className={menuLinkClass(isAboutActive, 'py-7')}
                >
                    ՀԵՂԻՆԱԿԻ ՄԱՍԻՆ
                </a>
                <a
                    href="/gallery"
                    onClick={onClose}
                    className={menuLinkClass(isGalleryActive)}
                >
                    ՊԱՏԿԵՐԱՍՐԱՀ
                </a>
                <a
                    href="/#discussions"
                    onClick={onClose}
                    className={menuLinkClass(isDiscussionsActive)}
                >
                    ՔՆՆԱՐԿՈՒՄՆԵՐԻ ՍԵՆՅԱԿ
                </a>
                <a
                    href="/about-author#contact"
                    onClick={onClose}
                    className={menuLinkClass(isContactActive)}
                >
                    ԿԱՊ
                </a>
                <a
                    href="https://ko-fi.com/tennisacademy"
                    onClick={onClose}
                    className={menuLinkClass(false)}
                >
                    ԱՋԱԿՑԵԼ ՆԱԽԱԳԾԻՆ
                </a>

                <div className="mt-auto px-6 py-5">
                    <div className="grid grid-cols-5 items-center gap-3 justify-items-center">
                        <a href="https://www.instagram.com/narearist/" aria-label="Instagram" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/instagram_menu.png" alt="Instagram" className="h-full w-full object-cover" />
                        </a>
                        <a href="https://t.me/tennisacademynovel" aria-label="Telegram" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/telegram_menu.png" alt="Telegram" className="h-full w-full object-cover" />
                        </a>
                        <a href="https://www.tiktok.com/@narearist" aria-label="TikTok" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/tiktok_menu.png" alt="TikTok" className="h-full w-full object-cover" />
                        </a>
                        <a href="https://www.facebook.com/share/18VPKjP1Jv/?mibextid=wwXIfr" aria-label="Facebook" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/facebook_menu.png" alt="Facebook" className="h-full w-full object-cover" />
                        </a>
                        <a href="https://www.youtube.com/@NareArist" aria-label="YouTube" className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                            <img src="/images/youtube_menu.png" alt="YouTube" className="h-full w-full object-cover" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

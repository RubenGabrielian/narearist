import { useEffect, useState } from 'react';

export default function SiteFooter() {
    const [email, setEmail] = useState('');
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0, rotation: 0 });

    const handleEmailSubmit = (event) => {
        event.preventDefault();
        if (!email.trim()) return;
        console.log('Email registered:', email);
        setEmail('');
    };

    useEffect(() => {
        const updateBallPosition = () => {
            const randomX = (Math.random() - 0.5) * 30;
            const randomY = (Math.random() - 0.5) * 30;
            const randomRotation = (Math.random() - 0.5) * 20;

            setBallPosition({
                x: randomX,
                y: randomY,
                rotation: randomRotation,
            });
        };

        updateBallPosition();
        const interval = setInterval(() => {
            updateBallPosition();
        }, 1500 + Math.random() * 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="relative bg-[#DB3106] text-white py-12 overflow-hidden">
            <div className="max-w-8xl mx-auto px-20 sm:px-20 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div>
                        <nav className="space-y-5">
                            <a href="#" className="block hover:text-yellow-200 transition-colors text-sm">
                                Հեղինակի մասին
                            </a>
                            <a href="/gallery" className="block hover:text-yellow-200 transition-colors text-sm">
                                պատկերասրահ
                            </a>
                            <a href="#" className="block hover:text-yellow-200 transition-colors text-sm">
                                Քննարկումների սենյակ
                            </a>
                            <a href="#" className="block hover:text-yellow-200 transition-colors text-sm">
                                Կապ
                            </a>
                        </nav>
                    </div>

                    <div className="flex justify-center md:w-[560px]">
                        <div className="flex flex-col">
                            <form onSubmit={handleEmailSubmit} className="w-full max-w-[560px]">
                                <div className="relative flex items-center">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="Գրանցվի՛ր, որ նորություններից հետ չմնաս"
                                        className="w-full px-6 py-3 pr-12 rounded-full bg-white backdrop-blur-sm border border-white/20 text-black placeholder-black/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all placeholder:text-sm"
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
                            <div className="mt-10 flex items-center gap-3">
                                <a href="#" aria-label="Instagram" className="group relative inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shadow-md">
                                    <img src="/images/Instagram_normal.png" alt="Instagram" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-100 group-hover:opacity-0" />
                                    <img src="/images/Instagram_hover.png" alt="Instagram hover" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                                </a>
                                <a href="#" aria-label="Telegram" className="group relative inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shadow-md">
                                    <img src="/images/telegram_normal.png" alt="Telegram" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-100 group-hover:opacity-0" />
                                    <img src="/images/telegram_hover.png" alt="Telegram hover" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                                </a>
                                <a href="#" aria-label="TikTok" className="group relative inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shadow-md">
                                    <img src="/images/tiktok_normal.png" alt="TikTok" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-100 group-hover:opacity-0" />
                                    <img src="/images/tiktok_hover.png" alt="TikTok hover" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                                </a>
                                <a href="#" aria-label="Facebook" className="group relative inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shadow-md">
                                    <img src="/images/facebook_normal.png" alt="Facebook" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-100 group-hover:opacity-0" />
                                    <img src="/images/facebook_hover.png" alt="Facebook hover" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                                </a>
                                <a href="#" aria-label="YouTube" className="group relative inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shadow-md">
                                    <img src="/images/youtube_normal.png" alt="YouTube" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-100 group-hover:opacity-0" />
                                    <img src="/images/youtube_hover.png" alt="YouTube hover" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end items-end gap-4 relative">
                        <div className="relative">
                            <div className="w-54 h-54 md:w-90 md:h-90 relative">
                                <div
                                    className="absolute inset-0 transition-all duration-1000 ease-out"
                                    style={{
                                        transform: `translate(${ballPosition.x}px, ${ballPosition.y}px) rotate(${ballPosition.rotation}deg)`,
                                    }}
                                >
                                    <img
                                        src="/tennis-balls.png"
                                        alt="Tennis ball"
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm opacity-90" style={{ marginTop: '0px' }}>
                        Copyright © {new Date().getFullYear()}  © All Rights Reserved By Naré Arist
                    </p>
                </div>
            </div>
        </footer>
    );
}

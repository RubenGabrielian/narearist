import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Volume2,
    SkipBack,
    SkipForward,
    List,
    X,
    BookOpen,
    Repeat,
    RotateCcw,
    Menu,
    ArrowRight,
    Send,
    Instagram,
    Facebook,
    Youtube,
    Music4,
} from 'lucide-react';

const CHAPTER_STORAGE_KEY = 'welcome-current-chapter';

export default function Welcome() {
    const [currentChapter, setCurrentChapter] = useState(() => {
        if (typeof window === 'undefined') return 1;
        const saved = sessionStorage.getItem(CHAPTER_STORAGE_KEY);
        const num = saved ? parseInt(saved, 10) : 1;
        return Number.isNaN(num) ? 1 : num;
    });
    const footerRef = useRef(null);
    const [showChapterList, setShowChapterList] = useState(false);
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0, rotation: 0 });
    const chapterListRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [showTelegramIcon, setShowTelegramIcon] = useState(true);
    const [typingDots, setTypingDots] = useState('');
    const [showTelegramBlock, setShowTelegramBlock] = useState(true);

    // Audio player state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isLooping, setIsLooping] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const audioRef = useRef(null);

    // Playback speed options
    const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

    const chapters = {
        1: {
            title: "ԳԼՈՒԽ 1",
            content: `«Զվարթնոցի փայլուն սալիկների վրա պտտվում են TUMI 19 Degree Worldwide Trip ճամպրուկի 🏷️$1,295 փոքրիկ սև ակերը։ Նրա հագուստը smart casual է, վերևից ներքև ամբողջությամբ սև գույնի. կիսաթև պոլո շապիկը՝ Loro Piana 🏷️$1,050, շալվարը՝ Isaia 🏷️$1,350, բոթասները՝ NikeCourt Air Zoom Vapor Pro 2 🏷️$79,99։ Թենիսի պայուսակը՝ HERMES Canvas Black Chevrons 🏷️$4,200, ժամացույցը՝ Vacheron Constantin Fiftysix day-date 🏷️$33,400։ Արևային ակնոցը՝ Persol PO0714 🏷️$440։ 
Դուրս գալով օդանավակայանից, նա իր օգնականի հետ մոտենում է մոխրագույն (Nardo Grey) Audi RS 5 🏷️$99,900 մեքենային։ Օգնականը բացում է մեքենայի բեռնախցիկը, ճամպրուկը տեղավորում այնտեղ։ Ապա մեքենայի բանալին տալիս է նրան։ Նա առանց շտապելու նստում է ղեկին։
ԱԿՍԵԼ ԲԱՏՐԻԿԵԱՆԸ ժամանեց Հայաստան։»

Հեռախոսս մի կողմ եմ դնում։ Ակսելի ժամանման լուրը արդեն տարածվել ա սոցցանցերում՝ Ֆեյսբուք, Ինսթագրամ, Թիք-թոք… համացանցում պտտվում են նրա լուսանկարները, վիդեոները ու տարբեր նկարագրություններ. որոշները արդեն հաշվել են նրա հագուկապի արժեքը, մյուսները՝ գեղարվեստորեն նկարագրում են նրա արտաքինը՝ «սլացիկ, բարձրահասակ, թիկնեղ», մի մասն էլ փորձում ա վերլուծել նրա տրամադրությունը. «քայլում է արագ, լայն ծնոտը՝ խիստ սեղմած, դեմքին ժպիտ չկա»։ `,
            image: "https://images.unsplash.com/photo-1622163642999-958ccb009458?w=800&h=600&fit=crop"
        },
        2: {
            title: "Գլուխ 2",
            content: `The four Grand Slam tournaments represent the pinnacle of professional tennis. These prestigious events are held annually and attract the world's best players.

Wimbledon, the oldest tournament, was first held in 1877 at the All England Club in London. It's the only Grand Slam still played on grass courts, maintaining its traditional white dress code.

The French Open, held at Roland Garros in Paris, is the premier clay court tournament. The US Open in New York and the Australian Open in Melbourne complete the Grand Slam circuit, each with its unique character and challenges.`,
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop"
        },
        3: {
            title: "Գլուխ 3",
            content: `Throughout tennis history, certain players have transcended the sport and become global icons. These legends have not only won numerous titles but have also shaped the way tennis is played and perceived.

From the grace and power of Roger Federer to the relentless determination of Rafael Nadal, and the dominance of Serena Williams, each era has produced players who have left an indelible mark on the sport.

These champions have inspired millions of fans worldwide and have elevated tennis to new heights of popularity and prestige.`,
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop"
        },
        4: {
            title: "Գլուխ 4",
            content: `The serve is arguably the most important shot in tennis. A powerful, well-placed serve can immediately put the server in control of the point, while a weak serve can be easily attacked.

Mastering the serve requires a combination of technique, power, and strategy. Players spend countless hours perfecting their service motion, working on everything from the ball toss to the follow-through.

Different surfaces favor different types of serves. Fast courts like grass reward flat, powerful serves, while clay courts allow for more spin and placement.`,
            image: "https://images.unsplash.com/photo-1622163642999-958ccb009458?w=800&h=600&fit=crop"
        },
    };

    // Calculate total chapters dynamically from chapters object
    const totalChapters = Object.keys(chapters).length;

    const goToPreviousChapter = () => {
        setCurrentChapter((prev) => (prev === 1 ? totalChapters : prev - 1));
    };

    const goToNextChapter = () => {
        setCurrentChapter((prev) => (prev === totalChapters ? 1 : prev + 1));
    };

    const currentChapterData = chapters[currentChapter];

    // Persist chapter so it survives re-renders/remounts (e.g. when modal closes)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(CHAPTER_STORAGE_KEY, String(currentChapter));
        }
    }, [currentChapter]);

    // Clamp persisted chapter to valid range on load
    useEffect(() => {
        if (currentChapter < 1 || currentChapter > totalChapters) {
            setCurrentChapter((prev) => Math.max(1, Math.min(prev, totalChapters)));
        }
    }, [totalChapters]);

    // Audio player controls
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            if (!isLooping) {
                setIsPlaying(false);
            }
        };

        audio.loop = isLooping;

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [isLooping]);

    // Update playback speed
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.playbackRate = playbackSpeed;
    }, [playbackSpeed]);

    // Update audio source when chapter changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        setIsPlaying(false);
        setCurrentTime(0);
        audio.load();
        // Maintain playback speed when chapter changes
        audio.playbackRate = playbackSpeed;
    }, [currentChapter, playbackSpeed]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        if (!audio) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newTime = percentage * duration;

        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const audio = audioRef.current;
        if (!audio) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));

        audio.volume = percentage;
        setVolume(percentage);
    };

    const skipBackward = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    };

    const skipForward = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.min(duration, audio.currentTime + 10);
    };

    const formatTime = (seconds) => {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            // TODO: Add email registration logic here
            console.log('Email registered:', email);
            setEmail('');
            // You can add a success message or API call here
        }
    };

    const changePlaybackSpeed = () => {
        const currentIndex = speedOptions.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speedOptions.length;
        setPlaybackSpeed(speedOptions[nextIndex]);
    };

    // // Close chapter list when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (chapterListRef.current && !chapterListRef.current.contains(event.target)) {
    //             setShowChapterList(false);
    //         }
    //     };

    //     if (showChapterList) {
    //         document.addEventListener('mousedown', handleClickOutside);
    //     }

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [showChapterList]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const nav = event.target.closest('nav');
            if (isMobileMenuOpen && nav && !nav.querySelector('button[aria-label="Toggle menu"]')?.contains(event.target)) {
                // Only close if clicking outside the menu items
                if (!nav.querySelector('.bg-black\\/80')?.contains(event.target)) {
                    setIsMobileMenuOpen(false);
                }
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);


    // Telegram floating block animation
    useEffect(() => {
        // Alternate between icon and text every 2 seconds
        const interval = setInterval(() => {
            setShowTelegramIcon((prev) => !prev);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Typing dots animation
    useEffect(() => {
        if (!showTelegramIcon) {
            const dotsInterval = setInterval(() => {
                setTypingDots((prev) => {
                    if (prev === '...') return '';
                    return prev + '.';
                });
            }, 500);

            return () => clearInterval(dotsInterval);
        } else {
            setTypingDots('');
        }
    }, [showTelegramIcon]);

    // Random tennis ball animation
    useEffect(() => {
        const updateBallPosition = () => {
            const randomX = (Math.random() - 0.5) * 30; // Random between -15 and 15
            const randomY = (Math.random() - 0.5) * 30; // Random between -15 and 15
            const randomRotation = (Math.random() - 0.5) * 20; // Random between -10 and 10 degrees

            setBallPosition({
                x: randomX,
                y: randomY,
                rotation: randomRotation,
            });
        };

        // Initial position
        updateBallPosition();

        // Update position at random intervals between 1.5 and 3 seconds
        const interval = setInterval(() => {
            updateBallPosition();
        }, 1500 + Math.random() * 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="ԹԵՆԻՍԻ ԱԿԱԴԵՄԻԱ - Welcome" />


            {/* Navigation Menu - Sticky */}
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
                </div>
            </nav>

            {/* Elegant Hero Section */}
            <section className="relative top-[-80px] w-full  overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/hero.png')"
                    }}
                >
                    <div className="absolute inset-0 from-black/60 via-black/50 to-black/70"></div>
                </div>

                {/* Hero Content */}
                <div className="relative h-[440px] flex flex-col items-center justify-center px-4">
                    <div className="text-center max-w-4xl">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight tracking-tight">
                            ԹԵՆԻՍԻ ԱԿԱԴԵՄԻԱ
                        </h1>
                    </div>
                </div>
            </section>

            {/* Chapter Navigation - Refined */}
            <section className="top-[-80px] relative mt-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">

                        <div className="flex-1 text-center relative" ref={chapterListRef}>
                            {/* Chapter List Button */}
                            <div className="mb-3">
                                <button
                                    onClick={() => setShowChapterList(!showChapterList)}
                                    className="absolute  inline-flex items-center gap-2 px-4 py-2 bg-white  text-white rounded-full shadow-md transition-all text-sm font-medium w-[80px] h-[80px]"
                                    style={{ boxShadow: '0px 5px 0px 0px #000000ba', bottom: '195px', left: '50%', transform: 'translateX(-50%)' }}
                                    aria-label="Show chapter list"
                                >
                                    <svg width="59" height="41" viewBox="0 0 59 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="8.34043" height="7.14894" fill="black" />
                                        <rect y="15.4894" width="8.34043" height="8.34043" fill="black" />
                                        <rect y="32.1703" width="8.34043" height="8.34043" fill="black" />
                                        <rect x="13.106" width="45.2766" height="7.14894" fill="black" />
                                        <rect x="13.106" y="15.4894" width="45.2766" height="8.34043" fill="black" />
                                        <rect x="13.106" y="32.1703" width="45.2766" height="8.34043" fill="black" />
                                    </svg>

                                </button>
                            </div>
                            <div className='flex items-center justify-center gap-20 mt-10'>
                                <button
                                    onClick={goToPreviousChapter}
                                    className="p-2.5  transition-all"
                                    aria-label="Previous chapter"
                                >
                                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                                </button>
                                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900 mb-3">
                                    {currentChapterData.title}
                                </h2>
                                <button
                                    onClick={goToNextChapter}
                                    className="p-2.5  transition-all"
                                    aria-label="Next chapter"
                                >
                                    <ChevronRight className="w-5 h-5 text-slate-700" />
                                </button>
                            </div>

                            <h3 className='text-2xl md:text-4xl font-serif font-semibold  mt-5 text-slate-900 mb-3 mt-10' style={{ fontFamily: 'Bokonique' }}>Ճեղք Ակադեմիայում</h3>
                            {/* <div className="flex items-center justify-center gap-2">
                                {Array.from({ length: totalChapters }, (_, i) => i + 1)
                                    .filter(chapterNum => chapters[chapterNum])
                                    .map((chapterNum) => (
                                        <button
                                            key={chapterNum}
                                            onClick={() => setCurrentChapter(chapterNum)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all ${chapterNum === currentChapter
                                                ? 'bg-slate-800 scale-125'
                                                : 'bg-slate-300 hover:bg-slate-400'
                                                }`}
                                            aria-label={`Go to chapter ${chapterNum}`}
                                        />
                                    ))}
                            </div> */}
                        </div>

                    </div>
                </div>
            </section>

            {/* Chapter List Modal */}
            {showChapterList && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop – only clicking here closes the modal */}
                    <div
                        className="absolute inset-0 z-0 bg-black/50"
                        onClick={() => setShowChapterList(false)}
                        aria-hidden="true"
                    />

                    {/* Modal Content – above backdrop so chapter clicks hit the list */}
                    <div
                        className="relative z-10 w-full max-w-md max-h-[80vh] rounded-[32px] shadow-2xl border-[2px] border-black bg-white pt-10 pb-4 overflow-visible"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top close button circle (half outside the modal) */}
                        <button
                            style={{ boxShadow: "rgba(0, 0, 0, 0.73) 0px 5px 0px 0px" }}
                            onClick={() => setShowChapterList(false)}
                            aria-label="Close chapter list"
                            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"
                        >
                            <span className="text-xl font-bold text-black leading-none">X</span>
                        </button>

                        {/* Modal Header */}
                        <div className="px-6 pb-4 border-b border-black/20">
                            <h2 className="w-full text-center text-2xl md:text-3xl font-bokonique text-black tracking-wide">
                                ԹԵՆԻՍԻ ԱԿԱԴԵՄԻԱ
                            </h2>
                        </div>

                        {/* Chapter List – table style */}
                        <div className="max-h-[60vh] overflow-y-auto">
                            {Array.from({ length: totalChapters }, (_, i) => i + 1)
                                .filter((chapterNum) => chapters[chapterNum])
                                .map((chapterNum) => {
                                    const isActive = chapterNum === currentChapter;

                                    return (
                                        <button
                                            key={chapterNum}
                                            type="button"
                                            data-chapter={chapterNum}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const num = Number(e.currentTarget.dataset.chapter);
                                                if (Number.isNaN(num)) return;
                                                setCurrentChapter(num);
                                                // Defer closing so chapter state commits before modal unmount
                                                requestAnimationFrame(() => {
                                                    setShowChapterList(false);
                                                });
                                            }}
                                            className="w-full border-b border-black/15 last:border-b-0 focus:outline-none cursor-pointer hover:opacity-90 transition-opacity text-left"
                                        >
                                            <div className="grid grid-cols-[120px_1fr]">
                                                {/* Left cell – chapter number */}
                                                <div
                                                    className={`px-4 py-3.5 border-r border-black/15 text-sm md:text-base font-bokonique ${isActive
                                                        ? 'bg-[#DB3106] text-white'
                                                        : 'text-black'
                                                        }`}
                                                >
                                                    Գլուխ {chapterNum}
                                                </div>

                                                {/* Right cell – chapter description (no active background) */}
                                                <div className="px-4 py-3.5 text-sm md:text-base text-left text-black">
                                                    Ճեղք Ակադեմիայում
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}

            {/* Professional Audio Player */}
            <section className="bg-white">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="rounded-[27px] p-5 border border-slate-200/50" style={{ backgroundColor: '#E5F6E0' }}>
                        {/* Titles */}
                        <div className="mb-5">
                            <p className="text-sm text-slate-600 font-medium mb-2 text-center">Աուդիոգիրք</p>
                            <h2 className="text-2xl md:text-xl font-serif font-bold text-slate-900 text-center">
                                Գլ. {currentChapter}. Ճեղք Ակադեմիայում
                            </h2>
                        </div>

                        {/* Progress Bar at Top */}
                        <div className="mb-5">
                            <div className="flex items-center gap-2" style={{ margin: '0 auto', width: '90%' }}>
                                <span className="text-xs text-slate-600 min-w-[45px] font-mono">
                                    {formatTime(currentTime)}
                                </span>
                                <div
                                    className="flex-1 h-1 bg-[#ABABAB]  cursor-pointer relative group"
                                    onClick={handleSeek}
                                >
                                    <div
                                        className="h-full bg-slate-700  transition-all"
                                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    />
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-700 rounded-full shadow-md"
                                        style={{ left: `calc(${duration ? (currentTime / duration) * 100 : 0}% - 8px)` }}
                                    />
                                </div>
                                <span className="text-xs text-slate-600 min-w-[45px] text-right font-mono">
                                    {formatTime(duration)}
                                </span>
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-center gap-3">
                            {/* Loop Button */}
                            <button
                                onClick={() => setIsLooping(!isLooping)}
                                className={`p-2 rounded-full transition-colors ${isLooping ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-600 hover:bg-white/50'}`}
                                aria-label="Toggle loop"
                            >
                                <Repeat className="w-5 h-5" />
                            </button>

                            {/* Skip Backward 10s */}


                            {/* Previous Chapter */}
                            <button
                                onClick={goToPreviousChapter}
                                className="p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 relative"
                                aria-label="Previous chapter"
                            >
                                <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.76172 4.8581L17.4768 0V9.7163L8.76172 4.8581Z" fill="black" />
                                    <path d="M0 4.8581L8.7151 0V9.7163L0 4.8581Z" fill="black" />
                                </svg>

                            </button>
                            <button
                                onClick={skipBackward}
                                className="p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 relative"
                                aria-label="Skip backward 10 seconds"
                            >
                                <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.00049 4.55151L2.69062 10.0655L8.30706 8.39984" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    <path d="M2.82561 9.86447C4.07563 6.75339 6.41512 4.18474 9.42149 2.62248C12.4279 1.06022 15.9029 0.607368 19.2189 1.34571C22.5349 2.08405 25.4733 3.96491 27.5033 6.64856C29.5332 9.3322 30.5209 12.6417 30.288 15.9792C30.055 19.3168 28.6168 22.4623 26.233 24.8477C23.8493 27.233 20.6772 28.701 17.2897 28.9863C13.9022 29.2716 10.5227 28.3555 7.76164 26.4035C5.00055 24.4515 3.03992 21.5922 2.23389 18.3422" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    <path d="M10.3647 18.0869H12.1372V11.9692L10.209 12.356V11.3677L12.1265 10.981H13.2114V18.0869H14.9839V19H10.3647V18.0869ZM17.1914 10.981H21.4507V11.894H18.1851V13.8599C18.3426 13.8062 18.5002 13.7668 18.6577 13.7417C18.8153 13.7131 18.9728 13.6987 19.1304 13.6987C20.0256 13.6987 20.7345 13.944 21.2573 14.4346C21.7801 14.9251 22.0415 15.5894 22.0415 16.4272C22.0415 17.2902 21.7729 17.9616 21.2358 18.4414C20.6987 18.9176 19.9414 19.1558 18.9639 19.1558C18.6273 19.1558 18.2835 19.1271 17.9326 19.0698C17.5853 19.0125 17.2254 18.9266 16.853 18.812V17.7217C17.1753 17.8971 17.5083 18.0278 17.8521 18.1138C18.1958 18.1997 18.5592 18.2427 18.9424 18.2427C19.5618 18.2427 20.0524 18.0798 20.4141 17.7539C20.7757 17.4281 20.9565 16.9858 20.9565 16.4272C20.9565 15.8687 20.7757 15.4264 20.4141 15.1006C20.0524 14.7747 19.5618 14.6118 18.9424 14.6118C18.6523 14.6118 18.3623 14.644 18.0723 14.7085C17.7858 14.7729 17.4922 14.8732 17.1914 15.0093V10.981Z" fill="black" />
                                </svg>


                                {/* <span className="absolute text-xs font-semibold" style={{ fontSize: '10px', lineHeight: '1' }}>10</span> */}
                            </button>

                            {/* Play/Pause */}
                            <button
                                onClick={togglePlayPause}
                                className="p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 relative"
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? (
                                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 1C28.9411 1 37 9.05887 37 19C37 28.9411 28.9411 37 19 37C9.05887 37 1 28.9411 1 19C1 9.05887 9.05887 1 19 1Z" stroke="black" stroke-width="2" />
                                        <rect x="15" y="12" width="3" height="13" fill="black" />
                                        <rect x="20" y="12" width="3" height="13" fill="black" />
                                    </svg>

                                ) : (
                                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 1C28.9411 1 37 9.05887 37 19C37 28.9411 28.9411 37 19 37C9.05887 37 1 28.9411 1 19C1 9.05887 9.05887 1 19 1Z" stroke="black" stroke-width="2" />
                                        <path d="M25.9378 19.069L14.2998 25.7879V12.3501L25.9378 19.069Z" fill="black" />
                                    </svg>

                                )}
                            </button>

                            <button
                                onClick={skipForward}
                                className="p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 relative"
                                aria-label="Skip forward 10 seconds"
                            >
                                <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.3208 4.55151L28.6307 10.0655L23.0142 8.39984" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    <path d="M28.4957 9.86447C27.2457 6.75339 24.9062 4.18474 21.8998 2.62248C18.8934 1.06022 15.4184 0.607368 12.1024 1.34571C8.78634 2.08405 5.84798 3.96491 3.81802 6.64856C1.78807 9.3322 0.800359 12.6417 1.03331 15.9792C1.26626 19.3168 2.70451 22.4623 5.08827 24.8477C7.47203 27.233 10.6441 28.701 14.0316 28.9863C17.4191 29.2716 20.7986 28.3555 23.5596 26.4035C26.3207 24.4515 28.2814 21.5922 29.0874 18.3422" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    <path d="M10.0405 18.592H11.813V12.4744L9.88477 12.8611V11.8728L11.8022 11.4861H12.8872V18.592H14.6597V19.5051H10.0405V18.592ZM16.8672 11.4861H21.1265V12.3992H17.8608V14.365C18.0184 14.3113 18.1759 14.2719 18.3335 14.2468C18.491 14.2182 18.6486 14.2039 18.8062 14.2039C19.7013 14.2039 20.4103 14.4491 20.9331 14.9397C21.4559 15.4303 21.7173 16.0945 21.7173 16.9324C21.7173 17.7953 21.4487 18.4667 20.9116 18.9465C20.3745 19.4228 19.6172 19.6609 18.6396 19.6609C18.3031 19.6609 17.9593 19.6322 17.6084 19.575C17.2611 19.5177 16.9012 19.4317 16.5288 19.3171V18.2268C16.8511 18.4023 17.1841 18.533 17.5278 18.6189C17.8716 18.7048 18.235 18.7478 18.6182 18.7478C19.2376 18.7478 19.7282 18.5849 20.0898 18.259C20.4515 17.9332 20.6323 17.491 20.6323 16.9324C20.6323 16.3738 20.4515 15.9316 20.0898 15.6057C19.7282 15.2799 19.2376 15.1169 18.6182 15.1169C18.3281 15.1169 18.0381 15.1492 17.748 15.2136C17.4616 15.2781 17.168 15.3783 16.8672 15.5144V11.4861Z" fill="black" />
                                </svg>

                            </button>
                            {/* Next Chapter */}
                            <button
                                onClick={goToNextChapter}
                                className="p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 relative"
                                aria-label="Next chapter"
                            >
                                <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.715 4.8581L0 9.7162V0L8.715 4.8581Z" fill="black" />
                                    <path d="M17.4772 4.8581L8.76221 9.7162V0L17.4772 4.8581Z" fill="black" />
                                </svg>

                            </button>

                            {/* Skip Forward 10s */}


                            {/* Playback Speed Control */}
                            <button
                                onClick={changePlaybackSpeed}
                                className="p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 relative min-w-[50px]"
                                aria-label={`Playback speed: ${playbackSpeed}x`}
                            >
                                {playbackSpeed}x
                            </button>
                        </div>
                    </div>

                    {/* Hidden Audio Element */}
                    <audio
                        ref={audioRef}
                        src={`/audio/chapter-${currentChapter}.mp3`}
                        preload="metadata"
                        loop={isLooping}
                    />
                </div>
            </section>

            {/* Reading Content - Book-like Layout */}
            <section className="py-12 md:py-0 bg-gradient-to-b from-white to-slate-50/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <article className="bg-white rounded-2xl overflow-scroll max-h-[800px]">

                        {/* Chapter Content - Optimized for Reading */}
                        <div className="p-8 md:p-12 lg:p-16">
                            <div className="prose prose-lg prose-slate max-w-none">
                                <div className="text-slate-800 leading-relaxed text-lg md:text-xl font-serif">
                                    <h3>ԱՊՐԻԼ</h3>
                                    {currentChapterData.content.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="mb-6 last:mb-0 text-justify">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                                <img src="/images/tenis.png" alt="Tennis" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </article>
                    <p className='ml-15 py-4 text-[#5B5753]'>© Illustrations By Ani Melikyan</p>
                </div>
            </section>

            {/* Tennis-Themed Footer */}
            <footer ref={footerRef} className="relative bg-[#DB3106] text-white py-12 overflow-hidden">
                <div className="max-w-8xl mx-auto px-20 sm:px-20 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* Footer Content */}
                        <div>
                            <nav className="space-y-5">
                                <a href="#" className="block hover:text-yellow-200 transition-colors text-sm">
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
                            <div className='flex flex-col'>
                                <form onSubmit={handleEmailSubmit} className="w-full max-w-md">
                                    <div className="relative flex items-center">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                <div className="mt-10 flex items-center gap-3">
                                    {/* Instagram */}
                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#DB3106] hover:bg-[#B9EB0C] hover:text-[#DB3106] transition-colors shadow-md"
                                    >
                                        <Instagram className="w-6 h-6" />
                                    </a>

                                    {/* Telegram (Send icon) */}
                                    <a
                                        href="#"
                                        aria-label="Telegram"
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#DB3106] hover:bg-[#B9EB0C] hover:text-[#DB3106] transition-colors shadow-md"
                                    >
                                        <Send className="w-6 h-6" />
                                    </a>

                                    {/* TikTok (Music4 icon as stylized note) */}
                                    <a
                                        href="#"
                                        aria-label="TikTok"
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#DB3106] hover:bg-[#B9EB0C] hover:text-[#DB3106] transition-colors shadow-md"
                                    >
                                        <Music4 className="w-6 h-6" />
                                    </a>

                                    {/* Facebook */}
                                    <a
                                        href="#"
                                        aria-label="Facebook"
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#DB3106] hover:bg-[#B9EB0C] hover:text-[#DB3106] transition-colors shadow-md"
                                    >
                                        <Facebook className="w-6 h-6" />
                                    </a>

                                    {/* YouTube */}
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

                        {/* Tennis Ball Animation - Wave */}
                        <div className="flex flex-col justify-end items-end gap-4 relative">
                            <div className="relative">
                                <div className="w-54 h-54 md:w-90 md:h-90 relative">
                                    {/* Tennis Ball with random animation */}
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

            {/* Floating Telegram Block */}
            {showTelegramBlock && (
                <div className="fixed bottom-6 left-15 z-40">
                    <div className="bg-black rounded-full w-30 h-30 shadow-lg flex items-center justify-center relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowTelegramBlock(false)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-3 h-3 text-black" />
                        </button>
                        {showTelegramIcon ? (
                            <svg width="70" height="70" viewBox="0 0 90 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M81.9945 0.58668C81.9945 0.58668 90.2865 -2.28985 89.5954 4.69602C89.3652 7.57259 87.2922 17.6404 85.6798 28.5302L80.1518 60.7886C80.1518 60.7886 79.6913 65.5143 75.5452 66.3362C71.399 67.158 65.1802 63.4597 64.0284 62.6377C63.107 62.0214 46.7535 52.7753 40.995 48.2551C39.3826 47.0223 37.5399 44.5566 41.2253 41.6801L65.4105 21.1335C68.1745 18.6678 70.9385 12.9148 59.4217 19.9007L27.175 39.4201C27.175 39.4201 23.4897 41.4746 16.5798 39.6255L1.60795 35.5161C1.60795 35.5161 -3.92008 32.4342 5.52363 29.352C28.5571 19.695 56.8882 9.83261 81.9945 0.58668Z" fill="white" />
                            </svg>
                        ) : (
                            <span className="text-white text-xs font-medium text-center px-2">
                                Միանալ քննարկմանը
                            </span>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

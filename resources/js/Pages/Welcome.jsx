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
} from 'lucide-react';
import SiteNav from '../Components/SiteNav';
import SiteFooter from '../Components/SiteFooter';

const CHAPTER_STORAGE_KEY = 'welcome-current-chapter';
const CHAPTER_UNLOCK_KEY = 'chapter4-unlocked';

export default function Welcome({ chaptersFromDb = [] }) {
    const [currentChapter, setCurrentChapter] = useState(() => {
        if (typeof window === 'undefined') return 1;
        const saved = sessionStorage.getItem(CHAPTER_STORAGE_KEY);
        const num = saved ? parseInt(saved, 10) : 1;
        return Number.isNaN(num) ? 1 : num;
    });
    const [showChapterList, setShowChapterList] = useState(false);
    const chapterListRef = useRef(null);
    const [readMoreEmail, setReadMoreEmail] = useState('');
    const [chapter4Unlocked, setChapter4Unlocked] = useState(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem(CHAPTER_UNLOCK_KEY) === 'true';
    });
    const [showSubscribeForm, setShowSubscribeForm] = useState(false);
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [subscribeSubmitted, setSubscribeSubmitted] = useState(false);
    const [subscribeProcessing, setSubscribeProcessing] = useState(false);
    const [subscribeError, setSubscribeError] = useState('');
    const [unlockedEmail, setUnlockedEmail] = useState('');
    const [showTelegramIcon, setShowTelegramIcon] = useState(true);
    const [typingDots, setTypingDots] = useState('');
    const [showTelegramBlock, setShowTelegramBlock] = useState(true);
    const readingContentRef = useRef(null);
    const shouldScrollAfterUnlockRef = useRef(false);

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

    const fallbackChapters = {
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

    const chapters = chaptersFromDb.reduce((accumulator, chapter) => {
        const audioUrl = chapter.audio_path
            ? (String(chapter.audio_path).startsWith('uploads/')
                ? `/${chapter.audio_path}`
                : `/storage/${chapter.audio_path}`)
            : null;

        accumulator[chapter.chapter_number] = {
            title: chapter.title,
            content: chapter.content,
            image: chapter.image || "https://images.unsplash.com/photo-1622163642999-958ccb009458?w=800&h=600&fit=crop",
            audioUrl,
        };
        return accumulator;
    }, {});

    const chapterNumbers = Object.keys(chapters)
        .map((chapterNumber) => Number(chapterNumber))
        .sort((a, b) => a - b);
    const hasChapters = chapterNumbers.length > 0;
    const totalChapters = chapterNumbers.length;
    const firstChapter = chapterNumbers[0] ?? 1;
    const lastChapter = chapterNumbers[chapterNumbers.length - 1] ?? firstChapter;

    const goToPreviousChapter = () => {
        setCurrentChapter((prev) => {
            const currentIndex = chapterNumbers.indexOf(prev);
            if (currentIndex <= 0) return prev;
            return chapterNumbers[currentIndex - 1];
        });
    };

    const goToNextChapter = () => {
        setCurrentChapter((prev) => {
            const currentIndex = chapterNumbers.indexOf(prev);
            if (currentIndex === -1 || currentIndex >= chapterNumbers.length - 1) return prev;
            const next = chapterNumbers[currentIndex + 1];
            if (next >= 4 && !chapter4Unlocked) return prev;
            return next;
        });
    };

    const currentChapterData = hasChapters
        ? (chapters[currentChapter] ?? chapters[firstChapter])
        : { title: '', content: '', image: '', audioUrl: null };
    const displayedChapterNumber = hasChapters
        ? (chapterNumbers.includes(currentChapter) ? currentChapter : firstChapter)
        : currentChapter;
    const isFirstChapter = !hasChapters || currentChapter === firstChapter;
    const hasLockedChaptersAhead = !chapter4Unlocked && chapterNumbers.some(n => n >= 4);
    const isLastChapter = !hasChapters || currentChapter === lastChapter || (currentChapter === 3 && hasLockedChaptersAhead);
    const hasHtmlContent = /<[^>]+>/.test(currentChapterData?.content ?? '');

    // Persist chapter so it survives re-renders/remounts (e.g. when modal closes)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(CHAPTER_STORAGE_KEY, String(currentChapter));
        }
    }, [currentChapter]);


    useEffect(() => {
        if (!hasChapters) return;
        if (!chapterNumbers.includes(currentChapter)) {
            setCurrentChapter(firstChapter);
        }
    }, [firstChapter, chapterNumbers, currentChapter, hasChapters]);

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

    const changePlaybackSpeed = () => {
        const currentIndex = speedOptions.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speedOptions.length;
        setPlaybackSpeed(speedOptions[nextIndex]);
    };

    const handleSubscribeSubmit = async () => {
        const targetEmail = subscribeEmail.trim();
        if (!targetEmail) {
            setSubscribeError('Խնդրում ենք մուտքագրել էլ. հասցեն։');
            return;
        }

        setSubscribeProcessing(true);
        setSubscribeError('');
        try {
            const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
                body: JSON.stringify({ email: targetEmail }),
            });
            if (!response.ok) {
                throw new Error('Subscription request failed');
            }
            setSubscribeSubmitted(true);
            setSubscribeEmail('');
        } catch (_) {
            setSubscribeError('Նամակը չուղարկվեց։ Խնդրում ենք փորձել կրկին։');
        } finally {
            setSubscribeProcessing(false);
        }
    };

    const handleReadMoreSubmit = async (event) => {
        event.preventDefault();
        const emailValue = readMoreEmail.trim();
        if (!emailValue) return;

        try {
            const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
            await fetch('/chapter-unlock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
                body: JSON.stringify({ email: emailValue }),
            });
        } catch (_) {
            // proceed with unlock even if request fails
        }

        localStorage.setItem(CHAPTER_UNLOCK_KEY, 'true');
        setChapter4Unlocked(true);
        setUnlockedEmail(emailValue);
        setSubscribeEmail(emailValue);
        setReadMoreEmail('');
        shouldScrollAfterUnlockRef.current = true;
        const chapter4Num = chapterNumbers.find(n => n >= 4);
        if (chapter4Num) setCurrentChapter(chapter4Num);
    };

    useEffect(() => {
        if (!shouldScrollAfterUnlockRef.current) return;
        const readingElement = readingContentRef.current;
        if (!readingElement) return;

        shouldScrollAfterUnlockRef.current = false;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Force the content container to start from its top.
                readingElement.scrollTop = 0;
                if (typeof readingElement.scrollTo === 'function') {
                    readingElement.scrollTo({ top: 0, behavior: 'auto' });
                }
                readingElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }, [currentChapter]);

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

    return (
        <>
            <Head title="ԹԵՆԻՍԻ ԱԿԱԴԵՄԻԱ - Welcome" />


            <SiteNav />


            {/* Elegant Hero Section */}
            <section className="relative top-[-80px] w-full  overflow-hidden">
                <div className="absolute inset-0 hidden lg:block bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/nare-arist-tennis-academy-armenian-novel-hero-desktop.svg')" }} />
                <div className="absolute inset-0 hidden md:block lg:hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/nare-arist-tennis-academy-armenian-novel-hero-tablet.svg')" }} />
                <div className="absolute inset-0 block md:hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/PHONEHERO.svg')" }} />
                <div className="absolute inset-0 from-black/60 via-black/50 to-black/70"></div>

                {/* Hero Content */}
                <div className="relative h-[440px] px-4" />
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
                                    className="absolute  inline-flex items-center gap-2 px-4 py-2 bg-white  text-white rounded-full shadow-md transition-all text-sm font-medium w-[80px] h-[80px] cursor-pointer hover:bg-slate-00"
                                    style={{ boxShadow: '0px 5px 0px 0px #000000ba', bottom: '175px', left: '50%', transform: 'translateX(-50%)' }}
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
                            <div className='flex items-center justify-center gap-10 mt-10'>
                                <button
                                    onClick={goToPreviousChapter}
                                    disabled={isFirstChapter}
                                    className={`p-2.5 transition-all ${isFirstChapter ? 'cursor-not-allowed opacity-80' : ''}`}
                                    aria-label="Previous chapter"
                                >
                                    <ChevronLeft className={`w-5 h-5 ${isFirstChapter ? 'text-slate-400' : 'text-slate-700'}`} />
                                </button>
                                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900">
                                    {hasChapters ? (chapterNumbers.includes(currentChapter) ? 'Գլուխ ' + currentChapter : 'Գլուխ ' + firstChapter) : 'ԳԼՈՒԽՆԵՐ ՉԿԱՆ'}
                                </h2>
                                <button
                                    onClick={goToNextChapter}
                                    disabled={isLastChapter}
                                    className={`p-2.5 transition-all ${isLastChapter ? 'cursor-not-allowed opacity-80' : ''}`}
                                    aria-label="Next chapter"
                                >
                                    <ChevronRight className={`w-5 h-5 ${isLastChapter ? 'text-slate-400' : 'text-slate-700'}`} />
                                </button>
                            </div>

                            <h3 className='text-2xl md:text-4xl font-serif font-semibold  mt-5 text-slate-900 mb-3 mt-10' style={{ fontFamily: 'Bokonique' }}>{chapters[currentChapter]?.title}</h3>
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
            {showChapterList && (
                <div className="inset-0 z-50 flex items-end md:items-center justify-center p-4">
                    {/* Backdrop – only clicking here closes the modal */}
                    {/* Modal Content – above backdrop so chapter clicks hit the list */}
                    <div
                        className="relative z-10 w-full max-w-md max-h-[80vh] rounded-[32px] shadow-2xl border-[2px] border-black bg-white pt-10 pb-4 overflow-visible"
                        style={{ top: '-315px' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top close button circle (half outside the modal) */}
                        <button
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.73) 0px 5px 0px 0px", width: '80px',
                                height: '80px',
                                top: '-38px'
                            }}
                            onClick={() => setShowChapterList(false)}
                            aria-label="Close chapter list"
                            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"
                        >
                            <span className="text-xl font-bold text-black leading-none"><svg width="37" height="46" viewBox="0 0 37 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.8639 45.376L18.1759 28.8L7.87193 45.44L0.959934 42.048L13.5679 22.848L-6.63996e-05 5.43999L7.93593 0.255985L18.2399 16.256L28.1599 -1.52588e-05L34.8799 3.96799L23.1679 22.208L36.7359 40.384L28.8639 45.376Z" fill="black" />
                            </svg>
                            </span>
                        </button>

                        {/* Modal Header */}
                        <div className="px-6 pb-4 border-b border-black/20">
                            <h2 className="w-full text-center text-2xl md:text-3xl font-bokonique text-black tracking-wide">
                                ԹԵՆԻՍԻ ԱԿԱԴԵՄԻԱ
                            </h2>
                        </div>

                        {/* Chapter List – table style */}
                        <div className="max-h-[60vh] overflow-y-auto">
                            {chapterNumbers.map((chapterNum) => {
                                const isActive = chapterNum === currentChapter;
                                const isLocked = chapterNum >= 4 && !chapter4Unlocked;

                                return (
                                    <button
                                        key={chapterNum}
                                        type="button"
                                        data-chapter={chapterNum}
                                        disabled={isLocked}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (isLocked) return;
                                            const num = Number(e.currentTarget.dataset.chapter);
                                            if (Number.isNaN(num)) return;
                                            setCurrentChapter(num);
                                            requestAnimationFrame(() => {
                                                setShowChapterList(false);
                                            });
                                        }}
                                        className={`w-full border-b border-black/15 last:border-b-0 focus:outline-none text-left transition-opacity ${isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}`}
                                    >
                                        <div className="group grid grid-cols-[120px_1fr] hover:bg-[#DB3106]">
                                            <div
                                                className={`px-4 py-3.5 border-r border-black/15 text-sm md:text-base font-bokonique ${isActive ? 'bg-[#DB3106] text-white' : 'text-black group-hover:text-white'}`}
                                            >
                                                Գլուխ {chapterNum}
                                            </div>
                                            <div className="px-4 py-3.5 text-sm md:text-base text-left text-black group-hover:text-white flex items-center justify-between">
                                                {chapters[chapterNum]?.title || `Գλуխ ${chapterNum}`}
                                                {isLocked && <span className="ml-2 group-hover:text-white">🔒</span>}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {/* Chapter List Modal */}

            {/* Professional Audio Player */}
            <section className="bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="relative rounded-[27px] p-5 border border-slate-200/50" style={{ backgroundColor: '#E5F6E0' }}>
                        {/* Titles */}
                        <div className="mb-5">
                            <h4 className="text-center text-sm md:text-base font-serif font-bold text-[#575757]">Գլ. {displayedChapterNumber} </h4>
                            <h2 className="text-2xl md:text-xl font-serif font-bold text-slate-900 text-center">
                                {chapters[currentChapter]?.title}
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

                        {/* Playback Speed Control */}
                        <button
                            onClick={changePlaybackSpeed}
                            className="absolute left-4 md:left-[90px] bottom-[20px] p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 min-w-[50px]"
                            aria-label={`Playback speed: ${playbackSpeed}x`}
                        >
                            {playbackSpeed}x
                        </button>
                        {/* Control Buttons */}
                        <div className="flex items-center justify-center gap-3">
                            {/* Skip Backward 10s */}


                            {/* Previous Chapter */}
                            <button
                                onClick={goToPreviousChapter}
                                className="p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 relative"
                                aria-label="Previous chapter"
                            >
                                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 5L11 10V0L2 5Z" fill="black" />
                                    <rect width="2" height="10" transform="matrix(-1 0 0 1 2 0)" fill="black" />
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
                                    <path d="M9.28955 17.5713H11.1157V12.3882L9.24121 12.7749V11.3677L11.105 10.981H13.0708V17.5713H14.897V19H9.28955V17.5713ZM16.8252 10.981H21.9653V12.501H18.4741V13.7417C18.6317 13.6987 18.7892 13.6665 18.9468 13.645C19.1079 13.62 19.2744 13.6074 19.4463 13.6074C20.4238 13.6074 21.1847 13.8527 21.729 14.3433C22.2733 14.8302 22.5454 15.5106 22.5454 16.3843C22.5454 17.2508 22.2482 17.9294 21.6538 18.4199C21.063 18.9105 20.2412 19.1558 19.1885 19.1558C18.7337 19.1558 18.2826 19.111 17.835 19.0215C17.391 18.9355 16.9487 18.8031 16.5083 18.624V16.9966C16.9451 17.2472 17.3587 17.4352 17.749 17.5605C18.1429 17.6859 18.5135 17.7485 18.8608 17.7485C19.3621 17.7485 19.756 17.6268 20.0425 17.3833C20.3325 17.1362 20.4775 16.8032 20.4775 16.3843C20.4775 15.9618 20.3325 15.6287 20.0425 15.3853C19.756 15.1418 19.3621 15.02 18.8608 15.02C18.5636 15.02 18.2467 15.0594 17.9102 15.1382C17.5736 15.2134 17.2119 15.3315 16.8252 15.4927V10.981Z" fill="black" />
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
                                        <rect x="15" y="12" width="3" height="14" fill="black" />
                                        <path d="M19 1C28.9411 1 37 9.05887 37 19C37 28.9411 28.9411 37 19 37C9.05887 37 1 28.9411 1 19C1 9.05887 9.05887 1 19 1Z" stroke="black" stroke-width="2" />
                                        <rect x="20" y="12" width="3" height="14" fill="black" />
                                    </svg>


                                ) : (
                                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 1C28.9411 1 37 9.05887 37 19C37 28.9411 28.9411 37 19 37C9.05887 37 1 28.9411 1 19C1 9.05887 9.05887 1 19 1Z" stroke="black" stroke-width="2" />
                                        <path d="M25.4858 19.2319L14.4858 26.2319V12.2319L25.4858 19.2319Z" fill="black" />
                                    </svg>


                                )}
                            </button>

                            <button
                                onClick={skipForward}
                                className="p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 relative"
                                aria-label="Skip forward 10 seconds"
                            >
                                <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.3208 4.55151L28.6307 10.0655L23.0142 8.39984" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    <path d="M28.4957 9.86447C27.2457 6.75339 24.9062 4.18474 21.8998 2.62248C18.8934 1.06022 15.4184 0.607368 12.1024 1.34571C8.78634 2.08405 5.84798 3.96491 3.81802 6.64856C1.78807 9.3322 0.800359 12.6417 1.03331 15.9792C1.26626 19.3168 2.70451 22.4623 5.08827 24.8477C7.47203 27.233 10.6441 28.701 14.0316 28.9863C17.4191 29.2716 20.7986 28.3555 23.5596 26.4035C26.3207 24.4515 28.2814 21.5922 29.0874 18.3422" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    <path d="M8.60986 17.5713H10.436V12.3882L8.56152 12.7749V11.3677L10.4253 10.981H12.3911V17.5713H14.2173V19H8.60986V17.5713ZM16.1455 10.981H21.2856V12.501H17.7944V13.7417C17.952 13.6987 18.1095 13.6665 18.2671 13.645C18.4282 13.62 18.5947 13.6074 18.7666 13.6074C19.7441 13.6074 20.505 13.8527 21.0493 14.3433C21.5936 14.8302 21.8657 15.5106 21.8657 16.3843C21.8657 17.2508 21.5685 17.9294 20.9741 18.4199C20.3833 18.9105 19.5615 19.1558 18.5088 19.1558C18.054 19.1558 17.6029 19.111 17.1553 19.0215C16.7113 18.9355 16.269 18.8031 15.8286 18.624V16.9966C16.2655 17.2472 16.679 17.4352 17.0693 17.5605C17.4632 17.6859 17.8338 17.7485 18.1812 17.7485C18.6825 17.7485 19.0763 17.6268 19.3628 17.3833C19.6528 17.1362 19.7979 16.8032 19.7979 16.3843C19.7979 15.9618 19.6528 15.6287 19.3628 15.3853C19.0763 15.1418 18.6825 15.02 18.1812 15.02C17.884 15.02 17.5671 15.0594 17.2305 15.1382C16.8939 15.2134 16.5322 15.3315 16.1455 15.4927V10.981Z" fill="black" />
                                </svg>


                            </button>
                            {/* Next Chapter */}
                            <button
                                onClick={goToNextChapter}
                                className="p-2 rounded-full hover:bg-white text-slate-700 hover:bg-slate-50 transition-colors hover:shadow-sm flex items-center justify-center w-10 h-10 relative"
                                aria-label="Next chapter"
                            >
                                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5L0 10V0L9 5Z" fill="black" />
                                    <rect x="9" width="2" height="10" fill="black" />
                                </svg>


                            </button>

                            {/* Skip Forward 10s */}



                        </div>
                    </div>

                    {/* Hidden Audio Element */}
                    <audio
                        ref={audioRef}
                        src={currentChapterData?.audioUrl ?? `/audio/chapter-${displayedChapterNumber}.mp3`}
                        preload="metadata"
                        loop={isLooping}
                    />
                </div>
            </section>

            {/* Reading Content - Book-like Layout */}
            <section className="py-12 md:py-0 bg-gradient-to-b from-white to-slate-50/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <article ref={readingContentRef} className="bg-white rounded-2xl overflow-scroll max-h-[800px]">

                        {/* Chapter Content - Optimized for Reading */}
                        <div className="p-8 md:p-12 lg:p-3">
                            <div className="prose prose-lg prose-slate max-w-none">
                                <div className="text-slate-800 leading-relaxed text-lg md:text-xl font-serif">
                                    {!hasChapters ? (
                                        <p className="mb-6 text-justify text-slate-500">
                                            Գլուխներ դեռ չկան։ Ավելացրեք գլուխներ admin panel-ից։
                                        </p>
                                    ) : hasHtmlContent ? (
                                        <div
                                            className="prose prose-slate max-w-none chapter-content"
                                            dangerouslySetInnerHTML={{ __html: currentChapterData.content }}
                                        />
                                    ) : (
                                        currentChapterData.content.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className="mb-6 last:mb-0 text-justify">
                                                {paragraph}
                                            </p>
                                        ))
                                    )}
                                </div>
                                {/* <img src="//images/tenis.png" alt="Tennis" className="w-full h-full object-cover" /> */}
                                {hasChapters && currentChapter >= 4 && (
                                    <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 md:p-6">
                                        {subscribeSubmitted ? (
                                            <p className="text-base md:text-lg text-black font-medium">
                                                Ստուգի՛ր էլ. հասցեդ 📬
                                            </p>
                                        ) : (
                                            <>
                                                <p className="text-base md:text-lg text-black font-medium">
                                                    Բաժանորդագրվի՛ր Թենիսի ակադեմիա մուտք ստանալու համար՝
                                                </p>
                                                <p className='mb-4'>1800 դրամ / ամիս</p>
                                                <p>📖 Նոր գլուխ ամեն շաբաթ</p>
                                                <p>🎧 Աուդիոգիրք յուրաքանչյուր գլխի համար</p>
                                                <p>🎨 Նկարազարդումներ յուրաքանչյուր գլխի համար</p>
                                                <p className='mt-4 text-base md:text-lg text-black font-medium'>Դարձիր Թենիսի ակադեմիայի անդամ։</p>
                                                <input
                                                    type="email"
                                                    value={subscribeEmail}
                                                    onChange={(event) => setSubscribeEmail(event.target.value)}
                                                    placeholder={unlockedEmail || 'Մուտքագրեք էլ. հասցեն'}
                                                    className="mt-3 w-full rounded-full border border-black/20 px-4 py-2.5 text-sm text-black placeholder-black/35 focus:outline-none focus:ring-2 focus:ring-black/30"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleSubscribeSubmit}
                                                    disabled={subscribeProcessing}
                                                    className="mt-3 inline-flex items-center justify-center rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-black/85 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    {subscribeProcessing ? 'Ուղարկվում է...' : 'Բաժանորդագրվել / 1800 ֏'}
                                                </button>
                                                {subscribeError && (
                                                    <p className="mt-2 text-sm text-red-600">{subscribeError}</p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                                {hasChapters && Number(currentChapter) === 3 && (
                                    <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 md:p-6">
                                        <p className="text-base md:text-lg text-black font-medium">
                                            Մուտքագրի՛ր էլ․ հասցեդ, որ բացես 4րդ գլուխը
                                        </p>
                                        <form onSubmit={handleReadMoreSubmit} className="mt-3 flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="email"
                                                value={readMoreEmail}
                                                onChange={(event) => setReadMoreEmail(event.target.value)}
                                                placeholder="Your email"
                                                className="w-full rounded-full border border-black/20 px-4 py-2.5 text-sm text-black placeholder-black/35 focus:outline-none focus:ring-2 focus:ring-black/30"
                                            />
                                            <button
                                                type="submit"
                                                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-black/85 transition-colors"
                                            >
                                                Շարունակել
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                    {/* <p className='ml-3 py-4 text-[#5B5753]'>© Illustrations By Ani Melikyan</p> */}
                </div>
            </section>

            {/* Tennis-Themed Footer */}
            <SiteFooter />

            {/* Floating Telegram Block */}
            {showTelegramBlock && (
                <div className="fixed bottom-6 left-15 z-40">

                    <div className="bg-black rounded-full w-25 h-25 md:w-30 md:h-30 shadow-lg flex items-center justify-center relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowTelegramBlock(false)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-3 h-3 text-black" />
                        </button>
                        {showTelegramIcon ? (
                            <a href="https://t.me/tennisacademynovel" target='_blank'>
                                <svg width="49" height="36" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44.4184 0.317818C44.4184 0.317818 48.9103 -1.24047 48.536 2.54394C48.4112 4.10225 47.2883 9.55625 46.4148 15.4555L43.4201 32.9306C43.4201 32.9306 43.1706 35.4906 40.9246 35.9359C38.6786 36.3811 35.3097 34.3776 34.6857 33.9323C34.1866 33.5985 25.3275 28.5896 22.208 26.1409C21.3345 25.4731 20.3363 24.1374 22.3327 22.5791L35.4344 11.4485C36.9317 10.1128 38.4291 6.99624 32.1901 10.7807L14.7213 21.3548C14.7213 21.3548 12.7249 22.4678 8.98165 21.4661L0.871065 19.2399C0.871065 19.2399 -2.1236 17.5704 2.99228 15.9007C15.4701 10.6693 30.8177 5.32656 44.4184 0.317818Z" fill="white" />
                                </svg>

                            </a>
                        ) : (

                            <span className="text-white text-xs font-medium text-center px-2 ">
                                <a href="https://t.me/tennisacademynovel" target='_blank'>Միանալ քննարկմանը  </a>
                            </span>

                        )}
                    </div>

                </div >
            )
            }
        </>
    );
}

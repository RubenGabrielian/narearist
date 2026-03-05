import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SiteFooter from '../Components/SiteFooter';
import MobileMenuOverlay from '../Components/MobileMenuOverlay';

const galleryImages = [
    {
        src: 'https://media.istockphoto.com/id/1510757303/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D0%B5%D0%BD%D0%BD%D0%B8%D1%81%D0%B8%D1%81%D1%82-%D0%BF%D0%BE%D0%B4%D0%B0%D0%B5%D1%82-%D1%82%D0%B5%D0%BD%D0%BD%D0%B8%D1%81%D0%BD%D1%8B%D0%B9-%D0%BC%D1%8F%D1%87-%D0%B2%D0%BE-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F-%D0%BC%D0%B0%D1%82%D1%87%D0%B0-%D0%BD%D0%B0-%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%BE%D0%BC-%D0%BA%D0%BE%D1%80%D1%82%D0%B5-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D1%8F-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B0-%D1%82%D1%80%D0%B5%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%BE%D0%BA-%D0%B8.jpg?s=612x612&w=0&k=20&c=bzPJIfeGGwVvL0zJIWemxm3LsyFOYfjaboMmuk6Es-8=',
        alt: 'Chapter 1 tennis image 1',
        chapter: 1,
    },
    {
        src: 'https://media.istockphoto.com/id/1483011696/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D0%B5%D0%BD%D0%BD%D0%B8%D1%81%D0%BD%D1%8B%D0%B9-%D0%BC%D1%8F%D1%87-%D1%80%D0%B0%D0%BA%D0%B5%D1%82%D0%BA%D0%B0-%D0%B8-%D0%BA%D0%BE%D1%80%D1%82-%D1%81-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82%D0%BD%D1%8B%D0%BC-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%82%D0%B2%D0%BE%D0%BC-%D1%80%D0%B0%D0%B7%D0%BC%D1%8B%D1%82%D1%8B%D0%BC-%D1%84%D0%BE%D0%BD%D0%BE%D0%BC-%D0%B8%D0%BB%D0%B8-%D1%81%D0%BE%D0%BB%D0%BD%D0%B5%D1%87%D0%BD%D1%8B%D0%BC-%D1%81%D0%B2%D0%B5%D1%82%D0%BE%D0%BC-%D0%BD%D0%B0.jpg?s=612x612&w=0&k=20&c=DFIVV6SYrT83jUE2EmM6vyAS-kNkjJP0ZP0BiioHMzE=',
        alt: 'Chapter 1 tennis image 2',
        chapter: 1,
    },
    {
        src: 'https://media.istockphoto.com/id/817164728/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D0%B5%D0%BD%D0%BD%D0%B8%D1%81%D0%B8%D1%81%D1%82%D1%8B-%D0%B8%D0%B3%D1%80%D0%B0%D1%8E%D1%82-%D0%BC%D0%B0%D1%82%D1%87-%D0%BD%D0%B0-%D0%BA%D0%BE%D1%80%D1%82%D0%B5.jpg?s=612x612&w=0&k=20&c=Exk97Ww6DdF2t7TImO2DJYeBm_4BSSwlSOf-ciyvGnA=',
        alt: 'Chapter 1 tennis image 3',
        chapter: 1,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,player&sig=104',
        alt: 'Chapter 1 tennis image 4',
        chapter: 1,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,stadium&sig=201',
        alt: 'Chapter 2 tennis image 1',
        chapter: 2,
    },
    {
        src: 'https://media.istockphoto.com/id/583853850/photo/family-playing-tennis-holding-rackets-and-ball.jpg?b=1&s=612x612&w=0&k=20&c=oBxmAknO6SSlcHdclvQJaDbeO2kSWByMqbxOX3XL_BM=',
        alt: 'Chapter 2 tennis image 2',
        chapter: 2,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,match&sig=203',
        alt: 'Chapter 2 tennis image 3',
        chapter: 2,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,athlete&sig=204',
        alt: 'Chapter 2 tennis image 4',
        chapter: 2,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,clay&sig=301',
        alt: 'Chapter 3 tennis image 1',
        chapter: 3,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,ball&sig=302',
        alt: 'Chapter 3 tennis image 2',
        chapter: 3,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,indoor&sig=303',
        alt: 'Chapter 3 tennis image 3',
        chapter: 3,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,grand-slam&sig=304',
        alt: 'Chapter 3 tennis image 4',
        chapter: 3,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,night&sig=401',
        alt: 'Chapter 4 tennis image 1',
        chapter: 4,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,champion&sig=402',
        alt: 'Chapter 4 tennis image 2',
        chapter: 4,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,practice&sig=403',
        alt: 'Chapter 4 tennis image 3',
        chapter: 4,
    },
    {
        src: 'https://source.unsplash.com/random/1200x1600/?tennis,travel&sig=404',
        alt: 'Chapter 4 tennis image 4',
        chapter: 4,
    },
];

export default function Gallery() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxZoom, setLightboxZoom] = useState(1);
    const pinchStartDistanceRef = useRef(null);
    const pinchStartZoomRef = useRef(1);
    const lastTapRef = useRef(0);

    const chapters = [...new Set(galleryImages.map((image) => image.chapter))];
    const filteredImages =
        selectedChapter === 'all'
            ? galleryImages
            : galleryImages.filter((image) => image.chapter === selectedChapter);

    useEffect(() => {
        setCurrentIndex(0);
        setIsLightboxOpen(false);
        setLightboxZoom(1);
    }, [selectedChapter]);

    useEffect(() => {
        if (!isLightboxOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isLightboxOpen]);

    const goToPreviousImage = () => {
        if (filteredImages.length === 0) return;
        setLightboxZoom(1);
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1));
    };

    const goToNextImage = () => {
        if (filteredImages.length === 0) return;
        setLightboxZoom(1);
        setCurrentIndex((prevIndex) => (prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1));
    };

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxZoom(1);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        setLightboxZoom(1);
    };

    const getTouchDistance = (touches) => {
        if (touches.length < 2) return 0;
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.hypot(dx, dy);
    };

    const handleLightboxTouchStart = (event) => {
        if (event.touches.length !== 2) return;
        pinchStartDistanceRef.current = getTouchDistance(event.touches);
        pinchStartZoomRef.current = lightboxZoom;
    };

    const handleLightboxTouchMove = (event) => {
        if (event.touches.length !== 2 || !pinchStartDistanceRef.current) return;
        event.preventDefault();
        const newDistance = getTouchDistance(event.touches);
        const scale = (newDistance / pinchStartDistanceRef.current) * pinchStartZoomRef.current;
        const clampedScale = Math.min(4, Math.max(1, scale));
        setLightboxZoom(clampedScale);
    };

    const handleLightboxTouchEnd = (event) => {
        if (event.touches.length < 2) {
            pinchStartDistanceRef.current = null;
        }
    };

    const handleLightboxImageTap = () => {
        const now = Date.now();
        if (now - lastTapRef.current < 280) {
            setLightboxZoom((prevZoom) => (prevZoom > 1 ? 1 : 2.5));
            lastTapRef.current = 0;
            return;
        }
        lastTapRef.current = now;
    };

    return (
        <>
            <Head title="պատկերասրահ" />

            <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="hidden md:flex items-center justify-center gap-8 md:gap-12">
                        <a
                            href="/gallery"
                            className="text-white text-sm md:text-base font-medium px-3 py-2 rounded-md bg-white/10"
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
                    </div>

                    <div className="md:hidden flex items-center justify-between">
                        <h1 className="text-white text-3xl font-semibold tracking-wide">
                            ՊԱՏԿԵՐԱՍՐԱՀ
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

            {/* Hero Section (same style as Home) */}
            <section className="relative top-[-80px] w-full overflow-hidden hidden md:block">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/hero.png')",
                    }}
                >
                    <div className="absolute inset-0 from-black/60 via-black/50 to-black/70"></div>
                </div>

                <div className="relative h-[440px] flex flex-col items-center justify-center px-4">
                    <div className="text-center max-w-4xl">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight tracking-tight">
                            Պատկերասրահ
                        </h1>
                    </div>
                </div>
            </section>

            <main className="bg-white min-h-screen  mt-0 md:-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="hidden md:flex flex-wrap items-center justify-center gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => setSelectedChapter('all')}
                            className={`px-4 py-2 rounded-full border transition-colors ${selectedChapter === 'all'
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-black border-black/30 hover:bg-black/5'
                                }`}
                        >
                            Բոլոր գլուխները
                        </button>
                        {chapters.map((chapter) => (
                            <button
                                key={chapter}
                                type="button"
                                onClick={() => setSelectedChapter(chapter)}
                                className={`px-4 py-2 rounded-full border transition-colors ${selectedChapter === chapter
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-black/30 hover:bg-black/5'
                                    }`}
                            >
                                Գլուխ {chapter}
                            </button>
                        ))}
                    </section>

                    <section className="relative flex items-center justify-center">
                        <div className="w-full md:hidden">
                            <div className="grid grid-cols-3 gap-1">
                                {filteredImages.map((image, index) => (
                                    <button
                                        key={`${image.src}-${index}`}
                                        type="button"
                                        onClick={() => openLightbox(index)}
                                        className={`relative aspect-square overflow-hidden bg-black/5 ${index === currentIndex ? 'ring-2 ring-black ring-inset' : ''
                                            }`}
                                        aria-label={`Open image ${index + 1}`}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {filteredImages[currentIndex] && (
                                <div className="mt-4">
                                    <p className="text-base text-black font-medium">
                                        Գլուխ {filteredImages[currentIndex].chapter}
                                    </p>
                                    <p className="text-sm text-[#5B5753]">© Illustrations By Ani Melikyan</p>
                                </div>
                            )}
                        </div>

                        <div className="hidden md:block w-full">
                            <button
                                type="button"
                                onClick={goToPreviousImage}
                                aria-label="Previous image"
                                className="absolute left-0 md:left-16 z-10 w-14 h-14 rounded-full bg-[#A7A7A7] text-white flex items-center justify-center hover:bg-[#8f8f8f] transition-colors"
                            >
                                <ChevronLeft className="w-7 h-7" />
                            </button>

                            {filteredImages[currentIndex] && (
                                <article className="w-full max-w-[620px] mx-auto">
                                    <div className="rounded-none overflow-hidden border border-black/10 bg-white shadow-sm">
                                        <img
                                            src={filteredImages[currentIndex].src}
                                            alt={filteredImages[currentIndex].alt}
                                            className="w-full h-[520px] md:h-[620px] object-cover"
                                        />
                                    </div>
                                    <p className="mt-3 text-base text-black font-medium">
                                        Գլուխ {filteredImages[currentIndex].chapter}
                                    </p>
                                    <p className="text-sm text-[#5B5753]">© Illustrations By Ani Melikyan</p>
                                </article>
                            )}

                            <button
                                type="button"
                                onClick={goToNextImage}
                                aria-label="Next image"
                                className="absolute right-0 md:right-16 z-10 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/85 transition-colors"
                            >
                                <ChevronRight className="w-7 h-7" />
                            </button>
                        </div>
                    </section>
                </div>
            </main>

            <SiteFooter />

            {isLightboxOpen && filteredImages[currentIndex] && (
                <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm md:hidden">
                    <div className="h-full relative">
                        <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-5">
                            <div className="flex items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsLightboxOpen(false)}
                                    className="h-11 w-11 rounded-full bg-white text-black flex items-center justify-center shadow"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <div className="px-26 py-2 rounded-full bg-white text-black text-xl font-semibold">
                                    ԳԼՈՒԽ {filteredImages[currentIndex].chapter}
                                </div>
                            </div>
                        </div>

                        <div
                            className="h-full overflow-auto pb-36 pt-20"
                            style={{ touchAction: 'none' }}
                            onTouchStart={handleLightboxTouchStart}
                            onTouchMove={handleLightboxTouchMove}
                            onTouchEnd={handleLightboxTouchEnd}
                        >
                            <div className="min-h-full min-w-full flex items-center justify-center px-2">
                                <img
                                    src={filteredImages[currentIndex].src}
                                    alt={filteredImages[currentIndex].alt}
                                    onClick={handleLightboxImageTap}
                                    className="max-h-[78vh] max-w-full w-auto object-contain select-none"
                                    draggable="false"
                                    style={{
                                        transform: `scale(${lightboxZoom})`,
                                        transformOrigin: 'center center',
                                        transition: 'transform 120ms ease-out',
                                    }}
                                />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 z-20  border-t border-black/20">
                            <div className="px-3 pt-2 pb-3">
                                <div className="overflow-x-auto">
                                    <div className="flex items-center gap-2 min-w-max">
                                        {filteredImages.map((image, index) => (
                                            <button
                                                key={`lightbox-thumb-${image.src}-${index}`}
                                                type="button"
                                                onClick={() => {
                                                    setCurrentIndex(index);
                                                    setLightboxZoom(1);
                                                }}
                                                className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 ${index === currentIndex ? 'border-white' : 'border-transparent'
                                                    }`}
                                                aria-label={`Show image ${index + 1}`}
                                            >
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-2 flex items-center justify-between text-white">
                                    <button
                                        type="button"
                                        onClick={() => setLightboxZoom(1)}
                                        className="px-3 py-1.5 rounded-full bg-white/20 text-sm font-medium"
                                    >
                                        {lightboxZoom.toFixed(1)}x
                                    </button>
                                    <p className="text-xs">
                                        {currentIndex + 1} / {filteredImages.length}
                                    </p>
                                    {/* <button
                                        type="button"
                                        onClick={goToNextImage}
                                        className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

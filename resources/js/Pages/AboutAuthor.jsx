import { Head } from '@inertiajs/react';
import SiteFooter from '../Components/SiteFooter';
import SiteNav from '../Components/SiteNav';

export default function AboutAuthor({ aboutImage, aboutContent }) {
    return (
        <>
            <Head title="Հևի坯ակի մասի坯" />

            <SiteNav activePage="about" mobileTitle="ՀԵՂԻՆԱԻ ՄԱՍԻՆ" />

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
                                    src={aboutImage ?? '/images/author.png'}
                                    alt="Նարէ Արիս"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right: author text */}
                        <div
                            className="text-slate-800 leading-relaxed text-base md:text-lg md:order-2 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: aboutContent ?? '' }}
                        />
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
                                type="email"
                                placeholder="Էլ․ հասցե"
                                className="w-full rounded-[6px] bg-[white] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
                            />
                            <input
                                type="text"
                                placeholder="Թեմա"
                                className="w-full rounded-[6px] bg-[white] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
                            />

                            <textarea
                                rows={5}
                                placeholder="Նամակդ գրի այստեղ..."
                                className="w-full rounded-[6px] bg-[white] border border-black/10 px-4 py-3 text-sm md:text-base placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30 resize-none"
                            />

                            <div className="pt-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-15 py-3 rounded-full bg-white text-black font-bokonique text-sm md:text-base tracking-wide hover:bg-[#FEEFE9] transition-colors"
                                    style={{ boxShadow: '-3px 4px 0 2px rgba(0, 0, 0, 0.85)' }}
                                >
                                    ՈԻՂԱՐԿԵԼ
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


<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nare - The Art of Reading</title>
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700|playfair-display:400,600,700" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Instrument Sans', 'sans-serif'],
                            serif: ['Playfair Display', 'serif'],
                        },
                        colors: {
                            brand: {
                                900: '#1a1614',
                                800: '#2c2520',
                                700: '#3e352f',
                                100: '#f5f2f0',
                                50: '#faf9f8',
                                accent: '#c4a484', // Sand/Gold
                            }
                        }
                    }
                }
            }
        </script>
        <style>
            body {
                background-color: #0f0d0c;
                color: #f5f2f0;
            }
            .glass-panel {
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .text-balance {
                text-wrap: balance;
            }
        </style>
    </head>
    <body class="antialiased font-sans selection:bg-brand-accent selection:text-brand-900">
        
        <!-- Navigation -->
        <nav class="fixed w-full z-50 top-0 transition-all duration-300 border-b border-white/5 bg-[#0f0d0c]/80 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="flex items-center justify-between h-20">
                    <div class="flex-shrink-0">
                        <a href="/" class="font-serif text-2xl font-bold tracking-tight text-white">
                            Nare<span class="text-brand-accent">.</span>
                        </a>
                    </div>
                    
                    @if (Route::has('login'))
                        <div class="flex items-center gap-6">
                            @auth
                                <a href="{{ url('/dashboard') }}" class="text-sm font-medium text-white/80 hover:text-white transition-colors">Dashboard</a>
                            @else
                                <a href="{{ route('login') }}" class="text-sm font-medium text-white/80 hover:text-white transition-colors">Log in</a>
                                @if (Route::has('register'))
                                    <a href="{{ route('register') }}" class="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-brand-900 transition-all duration-200 bg-brand-accent rounded-full hover:bg-brand-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent focus:ring-offset-[#0f0d0c]">
                                        Get Started
                                    </a>
                                @endif
                            @endauth
                        </div>
                    @endif
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <div class="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
            <!-- Background Gradients -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div class="absolute top-20 left-1/4 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px]"></div>
                <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]"></div>
            </div>

            <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div class="flex-1 text-center lg:text-left">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-brand-accent mb-8">
                        <span class="relative flex h-2 w-2">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                        </span>
                        Reimagining the reading experience
                    </div>
                    
                    <h1 class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 text-balance leading-tight">
                        Your personal <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-amber-200 italic pr-2">library of wisdom</span>
                    </h1>
                    
                    <p class="text-lg text-white/60 mb-8 max-w-2xl mx-auto lg:mx-0 text-balance leading-relaxed">
                        Curate, read, and retain more from your favorite books. A distraction-free environment designed for the modern intellectual.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <a href="{{ route('register') }}" class="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-brand-900 transition-all duration-200 bg-white rounded-full hover:bg-brand-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-[#0f0d0c]">
                            Start Reading Free
                        </a>
                        <a href="#features" class="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 focus:ring-offset-[#0f0d0c]">
                            Explore Library
                        </a>
                    </div>

                    <div class="mt-10 flex items-center justify-center lg:justify-start gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <!-- Social/Trust Proof (Mock logos) -->
                         <div class="text-xs font-medium tracking-widest uppercase text-white/40">Trusted by readers from</div>
                         <div class="flex -space-x-2">
                             <div class="h-6 w-6 rounded-full bg-white/20 border border-[#0f0d0c]"></div>
                             <div class="h-6 w-6 rounded-full bg-white/30 border border-[#0f0d0c]"></div>
                             <div class="h-6 w-6 rounded-full bg-white/40 border border-[#0f0d0c]"></div>
                         </div>
                    </div>
                </div>
                
                <div class="flex-1 w-full max-w-[600px] lg:max-w-none perspective-1000">
                    <div class="relative w-full aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden glass-panel p-2 animate-fade-in-up">
                        <div class="absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-transparent opacity-20"></div>
                         <!-- Hero Image -->
                        <img 
                            src="/images/hero-book.png" 
                            alt="Glowing open book in a dark void" 
                            class="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Grid -->
        <section id="features" class="py-24 bg-[#141210]">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="text-center max-w-2xl mx-auto mb-16">
                    <h2 class="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Crafted for the focused mind</h2>
                    <p class="text-white/60">Every feature is designed to help you get lost in the pages, not the interface.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1">
                        <div class="h-12 w-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-white mb-3">Seamless Reading</h3>
                        <p class="text-sm text-white/60 leading-relaxed">
                            A typography-first approach ensures that reading on looking at a screen feels as natural as paper.
                        </p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1">
                        <div class="h-12 w-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-white mb-3">Smart Insights</h3>
                        <p class="text-sm text-white/60 leading-relaxed">
                            Highlight logic that doesn't just store text, but helps you connect ideas across different books.
                        </p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1">
                         <div class="h-12 w-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-white mb-3">Digital Bookmark</h3>
                        <p class="text-sm text-white/60 leading-relaxed">
                            Sync your progress across all devices. Start on your phone, finish on your tablet.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="border-t border-white/5 bg-[#0f0d0c] pt-16 pb-12">
            <div class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
                <div class="font-serif text-2xl font-bold text-white mb-6">
                    Nare<span class="text-brand-accent">.</span>
                </div>
                <div class="flex gap-8 text-sm text-white/60 mb-8">
                    <a href="#" class="hover:text-white transition-colors">Privacy</a>
                    <a href="#" class="hover:text-white transition-colors">Terms</a>
                    <a href="#" class="hover:text-white transition-colors">Twitter</a>
                    <a href="#" class="hover:text-white transition-colors">Instagram</a>
                </div>
                <p class="text-xs text-white/30 text-center">
                    &copy; {{ date('Y') }} Nare Inc. All rights reserved. <br>
                    Crafted with Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})
                </p>
            </div>
        </footer>
    </body>
</html>

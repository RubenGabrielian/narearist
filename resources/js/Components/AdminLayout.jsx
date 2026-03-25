import { Link, useForm } from '@inertiajs/react';

const navItems = [
    { key: 'chapters', label: 'Chapters', href: '/admin/chapters' },
    { key: 'gallery', label: 'Gallery', href: '/admin/gallery' },
    { key: 'settings', label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ activePage, adminLogin, children }) {
    const logoutForm = useForm({});

    const handleLogout = (event) => {
        event.preventDefault();
        logoutForm.post('/admin/logout');
    };

    return (
        <main className="min-h-screen bg-slate-100">
            <div className="mx-auto flex max-w-7xl">
                <aside className="w-72 min-h-screen border-r border-slate-200 bg-white p-5">
                    <h1 className="text-xl font-semibold text-slate-900">Admin Panel</h1>
                    <p className="mt-1 text-sm text-slate-500">Logged in as: {adminLogin}</p>

                    <nav className="mt-6 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activePage === item.key
                                    ? 'bg-slate-900 text-white'
                                    : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <form onSubmit={handleLogout} className="mt-8">
                        <button
                            type="submit"
                            disabled={logoutForm.processing}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                        >
                            Logout
                        </button>
                    </form>
                </aside>

                <section className="flex-1 p-6 md:p-8">
                    {children}
                </section>
            </div>
        </main>
    );
}

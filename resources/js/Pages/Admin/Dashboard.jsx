import { Head, useForm, usePage } from '@inertiajs/react';

export default function AdminDashboard({ adminLogin, chapters = [] }) {
    const { props } = usePage();
    const { post, processing } = useForm({});
    const chapterForm = useForm({
        chapter_number: '',
        title: '',
        content: '',
        image: '',
    });

    const handleLogout = (event) => {
        event.preventDefault();
        post('/admin/logout');
    };

    const handleCreateChapter = (event) => {
        event.preventDefault();
        chapterForm.post('/admin/chapters', {
            onSuccess: () => {
                chapterForm.reset();
            },
        });
    };

    return (
        <>
            <Head title="Admin Dashboard" />

            <main className="min-h-screen bg-slate-100 px-4 py-8">
                <div className="mx-auto max-w-5xl">
                    <header className="rounded-2xl bg-white border border-slate-200 px-6 py-5 shadow-sm flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
                            <p className="text-sm text-slate-500 mt-1">Logged in as: {adminLogin}</p>
                        </div>

                        <form onSubmit={handleLogout}>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                            >
                                Logout
                            </button>
                        </form>
                    </header>

                    <section className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
                        <p className="mt-2 text-slate-600">
                            Add new book chapters here. New chapters will appear on the welcome page automatically.
                        </p>
                    </section>

                    <section className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">Add Chapter</h2>
                        {props.flash?.success && (
                            <p className="mt-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
                                {props.flash.success}
                            </p>
                        )}
                        <form onSubmit={handleCreateChapter} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Chapter Number</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={chapterForm.data.chapter_number}
                                    onChange={(event) => chapterForm.setData('chapter_number', event.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                                />
                                {chapterForm.errors.chapter_number && (
                                    <p className="mt-1 text-sm text-red-600">{chapterForm.errors.chapter_number}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={chapterForm.data.title}
                                    onChange={(event) => chapterForm.setData('title', event.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                                />
                                {chapterForm.errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{chapterForm.errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL (optional)</label>
                                <input
                                    type="url"
                                    value={chapterForm.data.image}
                                    onChange={(event) => chapterForm.setData('image', event.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                                />
                                {chapterForm.errors.image && (
                                    <p className="mt-1 text-sm text-red-600">{chapterForm.errors.image}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                                <textarea
                                    rows={8}
                                    value={chapterForm.data.content}
                                    onChange={(event) => chapterForm.setData('content', event.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                                />
                                {chapterForm.errors.content && (
                                    <p className="mt-1 text-sm text-red-600">{chapterForm.errors.content}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={chapterForm.processing}
                                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                            >
                                {chapterForm.processing ? 'Saving...' : 'Save Chapter'}
                            </button>
                        </form>
                    </section>

                    <section className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">Chapters</h2>
                        {chapters.length === 0 ? (
                            <p className="mt-2 text-slate-500">No chapters yet.</p>
                        ) : (
                            <div className="mt-4 space-y-3">
                                {chapters.map((chapter) => (
                                    <article key={chapter.id} className="rounded-lg border border-slate-200 p-3">
                                        <p className="text-sm font-semibold text-slate-900">
                                            Chapter {chapter.chapter_number}: {chapter.title}
                                        </p>
                                        <p className="mt-1 text-sm text-slate-600 line-clamp-3">{chapter.content}</p>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}

import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminGallery({ adminLogin, chapters = [], galleryImages = [] }) {
    const { props } = usePage();
    const uploadForm = useForm({
        chapter_number: '',
        alt: '',
        author_name: '',
        image: null,
    });
    const deleteForm = useForm({});

    const handleUpload = (event) => {
        event.preventDefault();
        uploadForm.post('/admin/gallery', {
            forceFormData: true,
            onSuccess: () => {
                uploadForm.reset();
            },
        });
    };

    const handleDelete = (imageId) => {
        if (!window.confirm('Delete this image?')) return;
        deleteForm.delete(`/admin/gallery/${imageId}`);
    };

    return (
        <>
            <Head title="Admin Gallery" />

            <AdminLayout activePage="gallery" adminLogin={adminLogin}>
                <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">Upload Gallery Image</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Select chapter, optional alt and image author name, upload image, then click Save Image.
                    </p>

                    {props.flash?.success && (
                        <p className="mt-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
                            {props.flash.success}
                        </p>
                    )}

                    <form onSubmit={handleUpload} className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Chapter</label>
                            <select
                                value={uploadForm.data.chapter_number}
                                onChange={(event) => uploadForm.setData('chapter_number', event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            >
                                <option value="">Select chapter</option>
                                {chapters.map((chapter) => (
                                    <option key={chapter.id} value={chapter.chapter_number}>
                                        Chapter {chapter.chapter_number} - {chapter.title}
                                    </option>
                                ))}
                            </select>
                            {uploadForm.errors.chapter_number && (
                                <p className="mt-1 text-sm text-red-600">{uploadForm.errors.chapter_number}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Alt text (optional)</label>
                            <input
                                type="text"
                                value={uploadForm.data.alt}
                                onChange={(event) => uploadForm.setData('alt', event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            />
                            {uploadForm.errors.alt && (
                                <p className="mt-1 text-sm text-red-600">{uploadForm.errors.alt}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image author name (optional)</label>
                            <input
                                type="text"
                                value={uploadForm.data.author_name}
                                onChange={(event) => uploadForm.setData('author_name', event.target.value)}
                                placeholder="e.g. Ani Melikyan"
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            />
                            {uploadForm.errors.author_name && (
                                <p className="mt-1 text-sm text-red-600">{uploadForm.errors.author_name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => uploadForm.setData('image', event.target.files?.[0] ?? null)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {uploadForm.errors.image && (
                                <p className="mt-1 text-sm text-red-600">{uploadForm.errors.image}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={uploadForm.processing}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                        >
                            {uploadForm.processing ? 'Saving...' : 'Save Image'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const section = document.getElementById('all-gallery-images');
                                section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="ml-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                            View All Images
                        </button>
                    </form>
                </section>

                <section id="all-gallery-images" className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        View All Images ({galleryImages.length})
                    </h2>
                    {galleryImages.length === 0 ? (
                        <p className="mt-2 text-slate-500">No images uploaded yet.</p>
                    ) : (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {galleryImages.map((item) => (
                                <article key={item.id} className="rounded-lg border border-slate-200 overflow-hidden">
                                    <img
                                        src={String(item.image_path ?? '').startsWith('uploads/')
                                            ? `/${item.image_path}`
                                            : `/storage/${item.image_path}`}
                                        alt={item.alt || `Chapter ${item.chapter_number} image`}
                                        className="w-full h-36 object-cover"
                                    />
                                    <div className="p-3">
                                        <p className="text-xs font-medium text-slate-700">
                                            Chapter {item.chapter_number}
                                        </p>
                                        {item.author_name && (
                                            <p className="text-xs text-slate-500 mt-1">© {item.author_name}</p>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item.id)}
                                            disabled={deleteForm.processing}
                                            className="mt-2 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </AdminLayout>
        </>
    );
}

import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminChapters({ adminLogin, chapters = [] }) {
    const { props } = usePage();
    const editorContainerRef = useRef(null);
    const editorInstanceRef = useRef(null);
    const [editorReady, setEditorReady] = useState(false);
    const [editorLoadError, setEditorLoadError] = useState('');
    const [editingChapterId, setEditingChapterId] = useState(null);
    const chapterForm = useForm({
        chapter_number: '',
        title: '',
        content: '',
        image: '',
        audio: null,
    });
    const deleteForm = useForm({});

    const resetEditorAndForm = () => {
        chapterForm.reset();
        setEditingChapterId(null);
        if (editorInstanceRef.current) {
            editorInstanceRef.current.setData('');
        }
        // reset the file input visually
        const audioInput = document.getElementById('chapter-audio-input');
        if (audioInput) audioInput.value = '';
    };

    const handleSubmitChapter = (event) => {
        event.preventDefault();
        // Read the latest editor HTML at submit time to avoid stale content payloads.
        const editorContent = editorInstanceRef.current
            ? editorInstanceRef.current.getData()
            : chapterForm.data.content;

        // Keep form state synced for validation rendering and retries.
        chapterForm.setData('content', editorContent);

        const baseTransform = (data) => ({
            ...data,
            chapter_number: String(data.chapter_number ?? '').trim(),
            title: String(data.title ?? '').trim(),
            content: editorContent,
            audio: data.audio instanceof File ? data.audio : null,
        });

        if (editingChapterId) {
            chapterForm.transform((data) => ({
                ...baseTransform(data),
                // Method spoofing keeps Laravel REST semantics while sending multipart POST.
                _method: 'PUT',
            }));
            chapterForm.post(`/admin/chapters/${editingChapterId}`, {
                // Always multipart for consistent shared-hosting parsing behavior.
                forceFormData: true,
                onSuccess: () => resetEditorAndForm(),
                onFinish: () => {
                    // Prevent transform leakage into subsequent create requests.
                    chapterForm.transform((data) => data);
                },
            });
            return;
        }

        chapterForm.transform((data) => baseTransform(data));
        chapterForm.post('/admin/chapters', {
            forceFormData: true,
            onSuccess: () => resetEditorAndForm(),
            onFinish: () => {
                chapterForm.transform((data) => data);
            },
        });
    };

    const startEditingChapter = (chapter) => {
        setEditingChapterId(chapter.id);
        chapterForm.setData('chapter_number', String(chapter.chapter_number ?? ''));
        chapterForm.setData('title', chapter.title ?? '');
        chapterForm.setData('content', chapter.content ?? '');
        chapterForm.setData('image', chapter.image ?? '');
        chapterForm.setData('audio', null);
        const audioInput = document.getElementById('chapter-audio-input');
        if (audioInput) audioInput.value = '';

        if (editorInstanceRef.current) {
            editorInstanceRef.current.setData(chapter.content ?? '');
        }
    };

    const deleteChapter = (chapterId) => {
        const confirmed = window.confirm('Are you sure you want to delete this chapter?');
        if (!confirmed) return;

        deleteForm.delete(`/admin/chapters/${chapterId}`);
    };

    const createUploadAdapter = (loader) => ({
        upload: () =>
            loader.file.then((file) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve({ default: reader.result });
                reader.onerror = () => reject(new Error('Image upload failed.'));
                reader.readAsDataURL(file);
            })),
        abort: () => { },
    });

    useEffect(() => {
        let isMounted = true;

        const initEditor = async () => {
            if (!editorContainerRef.current || editorInstanceRef.current) return;

            const createEditor = async () => {
                try {
                    const editor = await window.ClassicEditor.create(editorContainerRef.current, {
                        toolbar: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            'link',
                            'bulletedList',
                            'numberedList',
                            '|',
                            'imageUpload',
                            '|',
                            'outdent',
                            'indent',
                            '|',
                            'insertTable',
                            'blockQuote',
                            'undo',
                            'redo',
                        ],
                    });

                    if (!isMounted) {
                        await editor.destroy();
                        return;
                    }

                    editorInstanceRef.current = editor;
                    setEditorReady(true);
                    const fileRepository = editor.plugins.get('FileRepository');
                    fileRepository.createUploadAdapter = (loader) => createUploadAdapter(loader);
                    editor.model.document.on('change:data', () => {
                        chapterForm.setData('content', editor.getData());
                    });
                } catch (error) {
                    console.error(error);
                    setEditorLoadError('Failed to load CKEditor.');
                }
            };

            if (window.ClassicEditor) {
                await createEditor();
                return;
            }

            const scriptId = 'ckeditor5-classic-cdn';
            let script = document.getElementById(scriptId);

            if (!script) {
                script = document.createElement('script');
                script.id = scriptId;
                script.src = 'https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js';
                script.async = true;
                document.body.appendChild(script);
            }

            await new Promise((resolve, reject) => {
                if (window.ClassicEditor) {
                    resolve(true);
                    return;
                }

                script.addEventListener('load', resolve, { once: true });
                script.addEventListener('error', reject, { once: true });
            });

            await createEditor();
        };

        initEditor();

        return () => {
            isMounted = false;
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy();
                editorInstanceRef.current = null;
            }
        };
        // chapterForm methods are stable in inertia useForm.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head title="Admin Chapters" />
            <style>{`
                .chapter-editor .ck-editor__editable_inline {
                    min-height: 420px;
                }

                /* CKEditor heading styles can be overridden by global app CSS on some templates.
                   Force reasonable typography inside the editor so H1/H2/etc are visually distinct. */
                .chapter-editor .ck-content h1 {
                    font-size: 2rem;
                    line-height: 2.5rem;
                    font-weight: 700;
                    margin: 0.75rem 0 0.5rem;
                }
                .chapter-editor .ck-content h2 {
                    font-size: 1.5rem;
                    line-height: 2rem;
                    font-weight: 700;
                    margin: 0.75rem 0 0.5rem;
                }
                .chapter-editor .ck-content h3 {
                    font-size: 1.25rem;
                    line-height: 1.75rem;
                    font-weight: 700;
                    margin: 0.75rem 0 0.5rem;
                }
                .chapter-editor .ck-content p {
                    margin: 0.5rem 0;
                }
            `}</style>

            <AdminLayout activePage="chapters" adminLogin={adminLogin}>
                <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        {editingChapterId ? 'Edit Chapter' : 'Add Chapter'}
                    </h2>
                    {props.flash?.success && (
                        <p className="mt-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
                            {props.flash.success}
                        </p>
                    )}
                    <form onSubmit={handleSubmitChapter} className="mt-4 space-y-4">
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
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Audio File (MP3)
                                {editingChapterId && <span className="ml-1 font-normal text-slate-500">— leave empty to keep existing</span>}
                            </label>
                            <input
                                id="chapter-audio-input"
                                type="file"
                                accept=".mp3,audio/mpeg,audio/ogg,audio/wav"
                                onChange={(event) => chapterForm.setData('audio', event.target.files[0] ?? null)}
                                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
                            />
                            {chapterForm.errors.audio && (
                                <p className="mt-1 text-sm text-red-600">{chapterForm.errors.audio}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                            <div className="chapter-editor rounded-lg border border-slate-300 p-2 bg-white">
                                <div ref={editorContainerRef} />
                                {!editorReady && !editorLoadError && (
                                    <p className="text-sm text-slate-500">Loading editor...</p>
                                )}
                                {editorLoadError && (
                                    <p className="text-sm text-red-600">{editorLoadError}</p>
                                )}
                            </div>
                            <p className="mt-1 text-xs text-slate-500">
                                Rich text editor with formatting tools and image upload.
                            </p>
                            <textarea
                                value={chapterForm.data.content}
                                readOnly
                                className="sr-only"
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
                            {chapterForm.processing
                                ? (editingChapterId ? 'Updating...' : 'Saving...')
                                : (editingChapterId ? 'Update Chapter' : 'Save Chapter')}
                        </button>
                        {editingChapterId && (
                            <button
                                type="button"
                                onClick={resetEditorAndForm}
                                className="ml-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </section>

                <section className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">Chapters</h2>
                    {chapters.length === 0 ? (
                        <p className="mt-2 text-slate-500">No chapters yet.</p>
                    ) : (
                        <div className="mt-4 space-y-3">
                            {chapters.map((chapter) => (
                                <article key={chapter.id} className="rounded-lg border border-slate-200 p-3" style={{ maxWidth: '60vw' }}>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Chapter {chapter.chapter_number}: {chapter.title}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600 line-clamp-3">{chapter.content}</p>
                                    {chapter.audio_path && (
                                        <audio
                                            controls
                                            src={'/storage/' + chapter.audio_path}
                                            className="mt-2 w-full"
                                        />
                                    )}
                                    <div className="mt-3 flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => startEditingChapter(chapter)}
                                            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteChapter(chapter.id)}
                                            disabled={deleteForm.processing}
                                            className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
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

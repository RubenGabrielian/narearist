import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminSettings({ adminLogin, aboutImage, aboutContent }) {
    const { props } = usePage();
    const editorContainerRef = useRef(null);
    const editorInstanceRef = useRef(null);
    const [editorReady, setEditorReady] = useState(false);
    const [editorLoadError, setEditorLoadError] = useState('');
    const [imagePreview, setImagePreview] = useState(aboutImage ?? null);

    const form = useForm({
        image: null,
        content: aboutContent ?? '',
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        form.setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        form.post('/admin/settings', {
            forceFormData: true,
        });
    };

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
                            'outdent',
                            'indent',
                            '|',
                            'blockQuote',
                            'undo',
                            'redo',
                        ],
                        initialData: aboutContent ?? '',
                    });

                    if (!isMounted) {
                        await editor.destroy();
                        return;
                    }

                    editorInstanceRef.current = editor;
                    setEditorReady(true);
                    editor.model.document.on('change:data', () => {
                        form.setData('content', editor.getData());
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head title="Admin Settings" />
            <style>{`
                .about-editor .ck-editor__editable_inline {
                    min-height: 300px;
                }
            `}</style>

            <AdminLayout activePage="settings" adminLogin={adminLogin}>
                <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">About Page Settings</h2>

                    {props.flash?.success && (
                        <p className="mt-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
                            {props.flash.success}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                About Page Image
                            </label>

                            {imagePreview && (
                                <div className="mb-3">
                                    <img
                                        src={imagePreview}
                                        alt="About page preview"
                                        className="h-48 w-auto rounded-lg border border-slate-200 object-cover"
                                    />
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
                            />

                            {form.errors.image && (
                                <p className="mt-1 text-sm text-red-600">{form.errors.image}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                About Page Content
                            </label>

                            <div className="about-editor rounded-lg border border-slate-300 bg-white p-2">
                                <div ref={editorContainerRef} />
                                {!editorReady && !editorLoadError && (
                                    <p className="text-sm text-slate-500">Loading editor...</p>
                                )}
                                {editorLoadError && (
                                    <p className="text-sm text-red-600">{editorLoadError}</p>
                                )}
                            </div>

                            <textarea value={form.data.content} readOnly className="sr-only" />

                            {form.errors.content && (
                                <p className="mt-1 text-sm text-red-600">{form.errors.content}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                        >
                            {form.processing ? 'Saving...' : 'Save Settings'}
                        </button>
                    </form>
                </section>
            </AdminLayout>
        </>
    );
}
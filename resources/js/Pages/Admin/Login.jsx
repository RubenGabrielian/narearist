import { Head, useForm, usePage } from '@inertiajs/react';

export default function AdminLogin() {
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        login: '',
        password: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post('/admin/login');
    };

    return (
        <>
            <Head title="Admin Login" />

            <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
                <section className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-slate-900">Admin Panel</h1>
                    <p className="mt-1 text-sm text-slate-500">Enter your login and password.</p>

                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium text-slate-700 mb-1">
                                Login
                            </label>
                            <input
                                id="login"
                                type="text"
                                value={data.login}
                                onChange={(event) => setData('login', event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                                required
                            />
                        </div>

                        {errors.login && (
                            <p className="text-sm text-red-600">{errors.login}</p>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-slate-900 py-2.5 text-white font-medium hover:bg-slate-800 disabled:opacity-50"
                        >
                            {processing ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}

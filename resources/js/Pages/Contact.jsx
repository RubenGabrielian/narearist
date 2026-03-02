import { Head, Link } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="Contact" />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Contact Page
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            This is the contact page built with Inertia.js and React.
                        </p>
                        <Link
                            href="/"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

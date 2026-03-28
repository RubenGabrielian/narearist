import { Head } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminContacts({ adminLogin, emails = [] }) {
    return (
        <>
            <Head title="Admin Contacts" />

            <AdminLayout activePage="contacts" adminLogin={adminLogin}>
                <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Contacts ({emails.length})
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        All emails submitted from the website footer form.
                    </p>

                    {emails.length === 0 ? (
                        <p className="mt-4 text-slate-500">No emails submitted yet.</p>
                    ) : (
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                            #
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                            Submitted At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emails.map((item, index) => (
                                        <tr key={item.id} className="border-t border-slate-200">
                                            <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm text-slate-900 font-medium">{item.email}</td>
                                            <td className="px-4 py-3 text-sm text-slate-600">
                                                {item.created_at ? new Date(item.created_at).toLocaleString() : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </AdminLayout>
        </>
    );
}


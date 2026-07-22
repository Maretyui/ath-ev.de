'use client';

import { useState } from 'react';
import Link from 'next/link';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-70vh">

      <section className="px-8 py-20">
        <div className="max-w-xl mx-auto">
          {status === 'success' ? (
            <div className="text-center py-16 border border-white/10">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Nachricht gesendet</p>
              <p className="text-2xl font-bold tracking-tight mb-6">Danke!</p>
              <p className="text-gray-400 mb-10">Ich melde mich schnellstmöglich bei dir zurück.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-xs uppercase tracking-widest text-gray-400 border-b border-gray-600 pb-0.5 hover:text-white hover:border-white transition"
              >
                Neue Nachricht senden
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Dein Name"
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="deine@email.com"
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Thema
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Was ist das für eine Nachricht?"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Nachricht
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  placeholder="Deine Nachricht..."
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-xs uppercase tracking-widest text-red-500">
                  Etwas ist schief gelaufen. Bitte versuche es später erneut.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-gray-100 transition disabled:opacity-40"
              >
                {status === 'sending' ? 'Wird gesendet...' : 'Abschicken'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

"use client"

import { useState } from "react"
import { PageShell } from "@/components/page-shell"
import { Send, CheckCircle, Mail, MapPin, Users } from "lucide-react"

export default function KontaktPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <PageShell>
      <div className="flex-1 py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-14">
            <p className="text-sm uppercase tracking-widest text-cyan-600 font-medium mb-3">
              Kontakt
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance">
              Schreib uns einfach.
            </h1>
            <p className="mt-4 text-lg text-slate-500 max-w-md">
              Interesse am Tauchen? Fragen zum Verein? Wir antworten so schnell wir können.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10 items-start">

            {/* Left info */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Aquanautik-Taucher Hamburg e.V.</p>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    Kleiner, familiärer Tauchverein in Hamburg. Wir freuen uns über jede Anfrage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">E-Mail</p>
                  <a
                    href="mailto:info@ath-ev.de"
                    className="text-slate-500 text-sm mt-1 hover:text-cyan-600 transition-colors"
                  >
                    info@ath-ev.de
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Hamburg</p>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    Training in Hamburger Hallenbädern,
                    Freiwasser am Oortkatensee.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-sm font-semibold text-slate-700 mb-1">Schnuppertauchen</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Du möchtest einfach mal reinschnuppern? Kein Problem –
                  schreib uns und wir laden dich zum nächsten Training ein.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="md:col-span-3">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <CheckCircle className="w-14 h-14 text-emerald-500 mb-5" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Nachricht gesendet!</h2>
                  <p className="text-slate-500 max-w-sm">
                    Vielen Dank – wir melden uns bald bei dir.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-2.5 rounded-full border-2 border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* W3Forms access key - replace with your actual key */}
                  <input
                    type="hidden"
                    name="access_key"
                    value="YOUR_W3FORMS_ACCESS_KEY"
                  />
                  <input
                    type="hidden"
                    name="subject"
                    value="Neue Anfrage über ath-ev.de"
                  />
                  <input
                    type="hidden"
                    name="from_name"
                    value="ATH Website"
                  />
                  {/* Honeypot spam protection */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                  />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        placeholder="Dein Name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                        E-Mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="deine@email.de"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Betreff
                    </label>
                    <input
                      id="subject_field"
                      type="text"
                      name="Betreff"
                      placeholder="Worum geht es?"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Nachricht
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Deine Nachricht..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white transition-all resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                      Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns direkt an info@ath-ev.de.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-semibold rounded-full text-sm hover:bg-slate-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Nachricht senden
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

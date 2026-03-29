"use client"

import Link from "next/link"
import { Waves, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-300 flex items-center justify-center">
                <Waves className="w-6 h-6 text-slate-800" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                ATH<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Aquanautik-Taucher Hamburg e.V. - Einer der ältesten Tauchvereine 
              Hamburgs. Seit über 40 Jahren Tauchausbildung, Training und Gemeinschaft.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/news", label: "News" },
                { href: "/ausbildung", label: "Ausbildung" },
                { href: "/tauchspots", label: "Tauchspots" },
                { href: "/termine", label: "Termine" },
                { href: "/links", label: "Links" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">
              Kontakt
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                <span>Hamburg, Deutschland</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>kontakt@ath-ev.de</span>
              </li>
            </ul>
            
            {/* CTA */}
            <div className="mt-6">
              <Link
                href="/termine"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-400 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Jetzt mitmachen
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Aquanautik-Taucher Hamburg e.V. - Alle Rechte vorbehalten
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>VDST</span>
            <span className="text-slate-600">|</span>
            <span>CMAS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

import React, { useEffect, useState } from "react";
import { HelstommLogo } from "./HelstommLogo";
import {
  fetchContactPersons,
  fetchContactSettings,
  fetchSocialLinks,
  FALLBACK_CONTACT_SETTINGS,
  FALLBACK_SOCIAL_LINKS,
  submitContactForm,
} from "../api/contact";
import { fetchHeaderSettings } from "../api/header";
import { FALLBACK_HEADER } from "../data/header";
import { TEAM_MEMBERS } from "../data/helstommData";
import {
  ContactSettings,
  SocialLinkItem,
  SocialPlatform,
  TeamMember,
} from "../types";
import {
  Paperclip,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
const SOCIAL_ICONS: Record<
  SocialPlatform,
  React.ComponentType<{ className?: string }>
> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  other: Linkedin,
};
export const Footer: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [settings, setSettings] = useState<ContactSettings>(
    FALLBACK_CONTACT_SETTINGS,
  );
  const [people, setPeople] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [socials, setSocials] = useState<SocialLinkItem[]>(
    FALLBACK_SOCIAL_LINKS,
  );
  const [header, setHeader] = useState(FALLBACK_HEADER);
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchContactSettings(),
      fetchContactPersons(),
      fetchSocialLinks(),
      fetchHeaderSettings(),
    ]).then(([nextSettings, nextPeople, nextSocials, nextHeader]) => {
      if (cancelled) return;
      setSettings(nextSettings);
      setPeople(nextPeople);
      setSocials(nextSocials);
      setHeader(nextHeader);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      await submitContactForm({ name, email, file });
      setSubmitted(true);
      setFile(null);
    } catch {
      setSubmitError(settings.errorText);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <footer
      id="susisiekite-su-mumis"
      className="bg-[#F6F7F9] border-t border-[#C9CED6] pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Form Section matching mockup design */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight">
              {settings.heading}
            </h2>
            <p className="text-slate-600 text-sm mt-4 font-medium">
              {settings.subtitle}
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-sm border border-[#C9CED6]">
            <div className="text-xs font-medium uppercase text-[#b8cd33] tracking-wider mb-4">
              {settings.formLabel}
            </div>
            {submitted ? (
              <div className="bg-white rounded-sm p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-[#b8cd33] text-slate-950 rounded-sm flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {settings.successTitle}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {settings.successText.replace("{email}", email)}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                  }}
                  className="px-4 py-2 bg-[#b8cd33] text-slate-950 font-medium rounded-sm text-xs"
                >
                  {settings.sendAnotherLabel}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={settings.namePlaceholder}
                      className="w-full p-3 bg-white rounded-sm border border-slate-300 text-sm font-medium text-slate-900 outline-none focus:border-[#b8cd33] focus:ring-1 focus:ring-[#b8cd33]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={settings.emailPlaceholder}
                      className="w-full p-3 bg-white rounded-sm border border-slate-300 text-sm font-medium text-slate-900 outline-none focus:border-[#b8cd33] focus:ring-1 focus:ring-[#b8cd33]"
                    />
                  </div>
                </div>
                <div className="relative bg-white rounded-sm border border-slate-300 p-3 cursor-pointer focus-within:border-[#b8cd33] focus-within:ring-1 focus-within:ring-[#b8cd33]">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center space-x-2 text-slate-700 font-medium text-sm">
                    <Paperclip className="w-5 h-5 text-[#7a8a18] transition-transform" />
                    <span>
                      {file
                        ? `${settings.fileAttachedPrefix} ${file.name}`
                        : settings.filePlaceholder}
                    </span>
                  </div>
                </div>
                {submitError && (
                  <p className="text-xs font-semibold text-red-600">
                    {submitError}
                  </p>
                )}
                <div className="text-right">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 bg-[#b8cd33] hover:bg-[#a6ba2a] disabled:opacity-60 text-slate-950 font-medium rounded-sm text-sm transition-all cursor-pointer"
                  >
                    {submitting
                      ? settings.submittingLabel
                      : settings.submitLabel}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        {/* Team Contact Cards matching mockup */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto">
          {people.map((member, index) => (
            <div
              key={`${member.email}-${index}`}
              className="bg-white p-3 sm:p-5 rounded-sm border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4 transition-shadow"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-sm object-cover shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-tight truncate">
                  {member.name}
                </h3>
                <p className="text-[10px] sm:text-xs font-semibold text-[#7a8a18] line-clamp-1">
                  {member.role}
                </p>
                <div className="pt-1 text-[10px] sm:text-xs text-slate-600 space-y-0.5">
                  <a
                    href={`tel:${member.phone.replace(/\s+/g, "")}`}
                    className="block font-medium hover:text-[#7a8a18] transition-colors truncate"
                  >
                    {member.phone}
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="block hover:underline truncate"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Social Icons & Company Footer Info matching mockup */}
        <div className="text-center space-y-6 pt-6 border-t border-[#b8cd33]/50">
          <div className="flex items-center justify-center space-x-4">
            {socials.map((link) => {
              const Icon = SOCIAL_ICONS[link.platform] || Linkedin;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-sm bg-slate-900 hover:bg-[#b8cd33] hover:text-slate-950 text-white flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          <div className="space-y-1 text-slate-800 text-xs font-medium flex flex-col items-center">
            {header.logoUrl ? (
              <img
                src={header.logoUrl}
                alt={header.brandName}
                className="h-12 w-auto mb-2"
              />
            ) : (
              <HelstommLogo compact className="h-14 w-auto mb-2" />
            )}
            <p className="font-semibold text-slate-900">
              {settings.companyName}
            </p>
            {settings.address && (
              <p>
                {settings.addressLabel} {settings.address}
              </p>
            )}
            <p>
              {settings.phone && (
                <>
                  {settings.phoneLabel}
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="font-medium hover:underline"
                  >
                    {settings.phone}
                  </a>
                </>
              )}
              {settings.phone && settings.publicEmail ? " | " : null}
              {settings.publicEmail && (
                <>
                  {settings.emailLabel}
                  <a
                    href={`mailto:${settings.publicEmail}`}
                    className="font-medium hover:underline"
                  >
                    {settings.publicEmail}
                  </a>
                </>
              )}
            </p>
          </div>
          <div className="text-[11px] text-slate-500 pt-4 flex flex-col items-center gap-2">
            <a
              href="/privatumas"
              className="font-medium text-slate-600 hover:text-slate-900 underline"
            >
              Privatumo politika
            </a>
            <span>
              {(
                settings.footerLine || `© {year} ${settings.copyrightText}`
              ).replace(/\{year\}/g, String(new Date().getFullYear()))}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

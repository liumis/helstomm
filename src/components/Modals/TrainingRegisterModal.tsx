import React, { useEffect, useState } from "react";
import {
  X,
  GraduationCap,
  Check,
  Download,
  FileText,
  Calendar,
  Clock,
  Award,
} from "lucide-react";
import { fetchMokymaiBlock } from "../../api/mokymai";
import { submitTrainingForm } from "../../api/contact";
import { FALLBACK_MOKYMAI } from "../../data/mokymai";
import { isOpenableFile } from "../../lib/files";
import type { MokymaiBlock } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TrainingRegisterModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [block, setBlock] = useState<MokymaiBlock>(FALLBACK_MOKYMAI);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    participantsCount: "1",
    topic:
      FALLBACK_MOKYMAI.formTopics?.[0]?.title ||
      FALLBACK_MOKYMAI.topics?.[0]?.title ||
      "",
  });

  useEffect(() => {
    if (!isOpen) return;
    fetchMokymaiBlock().then((next) => {
      setBlock(next);
      const topics = next.formTopics?.length
        ? next.formTopics
        : next.topics || [];
      setFormData((current) => {
        if (topics.some((item) => item.title === current.topic)) return current;
        return { ...current, topic: topics[0]?.title || current.topic };
      });
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const formTopics = block.formTopics?.length
    ? block.formTopics
    : block.topics || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      await submitTrainingForm(formData);
      setSubmitted(true);
    } catch {
      setSubmitError("Nepavyko užregistruoti. Bandykite dar kartą.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-sm max-w-2xl w-full p-6 md:p-8 overflow-y-auto max-h-[92vh] border border-slate-100"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Uždaryti"
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 rounded-sm hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="pr-10 pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-sm bg-slate-900 text-white font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Filigran akademija
              </h2>
              <p className="text-sm text-slate-500">
                {block.certificateNote ||
                  "Susisieksime per 1 darbo dieną ir patvirtinsime datą."}
              </p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#b8cd33] text-slate-950 rounded-sm flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Registracija Sėkminga!
            </h3>
            <p className="text-slate-600 max-w-md mx-auto text-sm">
              Dėkojame! Registracijos patvirtinimas ir mokymų programa išsiųsta
              adresu{" "}
              <span className="font-semibold text-slate-900">
                {formData.email}
              </span>
              . Mūsų specialistai susisieks dėl tikslios datos.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-[#b8cd33] text-slate-950 font-medium rounded-sm text-sm"
            >
              Grįžti į puslapį
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-sm border border-slate-200/80">
              <div className="flex items-center space-x-2 text-slate-700">
                <Clock className="w-4 h-4 text-[#5F6F0E] shrink-0" />
                <span className="text-xs font-medium">
                  2 d. montuotojams · 2 val. konstruktoriams
                </span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <Award className="w-4 h-4 text-[#7a8a18] shrink-0" />
                <span className="text-xs font-medium">
                  Suteikiamas atestatas
                </span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <Calendar className="w-4 h-4 text-[#5F6F0E] shrink-0" />
                <span className="text-xs font-medium">
                  Kas savaitę / Objektai
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Vardas, Pavardė *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="PVZ.: Jonas Jonaitis"
                    className="w-full p-2.5 border border-slate-300 rounded-sm text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Įmonė / Organizacija
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="UAB Statybų Valdymas"
                    className="w-full p-2.5 border border-slate-300 rounded-sm text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    El. Paštas *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="vardas@imone.lt"
                    className="w-full p-2.5 border border-slate-300 rounded-sm text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Telefonas *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+370 600 00000"
                    className="w-full p-2.5 border border-slate-300 rounded-sm text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Dalyvių Skaičius
                  </label>
                  <select
                    value={formData.participantsCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        participantsCount: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-slate-300 rounded-sm text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                  >
                    <option value="1">1 Asmuo</option>
                    <option value="2-5">2 - 5 Asmenys</option>
                    <option value="6-15">6 - 15 Asmenų (Komanda)</option>
                    <option value="15+">Daugiau nei 15 (Visas objektas)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mokymų Tema
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="w-full p-2.5 border border-slate-300 rounded-sm text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                  >
                    {formTopics.map((item) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {submitError && (
                <p className="text-xs font-semibold text-red-600">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[#b8cd33] hover:bg-[#a6ba2a] disabled:opacity-60 text-slate-950 font-medium rounded-sm text-base transition-all mt-2"
              >
                {submitting
                  ? "Siunčiama..."
                  : block.registerCta ||
                    "Registruotis į mokymus ir gauti atestatą"}
              </button>
            </form>

            {block.manuals.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-3">
                  {block.manualsHeading ||
                    "Atsisiųskite montavimo instrukcijas PDF"}
                </h4>
                <div className="space-y-2">
                  {block.manuals.map((item) => {
                    const canDownload = isOpenableFile(item.url);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 bg-slate-50 rounded-sm text-xs hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center space-x-2 min-w-0">
                          <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                          <span className="font-semibold text-slate-800 truncate">
                            {item.title}
                          </span>
                        </div>
                        {canDownload ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-[#7a8a18] font-medium hover:underline shrink-0 ml-3"
                          >
                            <span>
                              {block.downloadLabel || "Atsisiųsti"}
                              {item.fileSize ? ` (${item.fileSize})` : ""}
                            </span>
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-slate-400 font-semibold shrink-0 ml-3">
                            Netrukus
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { CalculatorDef } from '../../data/calculators';

interface Props {
  calculator: CalculatorDef;
  onClose: () => void;
}

function scopeCss(css: string) {
  return css.replace(/:root\b/g, '.calc-fs').replace(/(^|[,}\s])body\b/g, '$1.calc-fs');
}

function runInlineScript(code: string) {
  const script = document.createElement('script');
  script.dataset.calcScript = '1';
  script.textContent = `(function(){\n${code}\n;if(typeof unlock==='function'){window.unlock=unlock;}\n})();`;
  document.body.appendChild(script);
}

function runExternalScript(src: string) {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.dataset.calcScript = '1';
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}

function cleanupInjected() {
  document.querySelectorAll('style[data-calc-style],link[data-calc-font],script[data-calc-script]').forEach((node) => {
    node.remove();
  });
  document.getElementById('ask-overlay')?.remove();
  try {
    delete (window as { unlock?: unknown }).unlock;
  } catch {
    (window as { unlock?: unknown }).unlock = undefined;
  }
}

export const CalculatorView: React.FC<Props> = ({ calculator, onClose }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKey);

    let cancelled = false;

    fetch(`/skaiciuokles-forms/${calculator.file}`)
      .then((response) => response.text())
      .then(async (html) => {
        if (cancelled || !hostRef.current) return;
        const parsed = new DOMParser().parseFromString(html, 'text/html');

        parsed.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
          const next = document.createElement('link');
          next.rel = 'stylesheet';
          next.href = link.getAttribute('href') || '';
          next.dataset.calcFont = '1';
          document.head.appendChild(next);
        });

        parsed.querySelectorAll('style').forEach((style) => {
          const next = document.createElement('style');
          next.dataset.calcStyle = '1';
          next.textContent = scopeCss(style.textContent || '');
          document.head.appendChild(next);
        });

        const host = hostRef.current;
        host.innerHTML = '';
        Array.from(parsed.body.childNodes).forEach((node) => {
          if (node.nodeName === 'SCRIPT') return;
          host.appendChild(document.importNode(node, true));
        });

        for (const script of Array.from(parsed.querySelectorAll('script'))) {
          if (cancelled) return;
          const src = script.getAttribute('src');
          if (src) {
            await runExternalScript(src);
          } else if (script.textContent?.trim()) {
            runInlineScript(script.textContent);
          }
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      cleanupInjected();
    };
  }, [calculator.file]);

  return createPortal(
    <div className="calc-modal-root fixed inset-0 z-[200] bg-[#F6F7F9]">
      <style>{`
        .calc-fs .fixed{position:static!important;inset:auto!important}
        @media (max-width:640px){.calc-fs .tstrip,.calc-fs .crumb{padding-right:52px}}
      `}</style>
      <button
        type="button"
        onClick={onClose}
        aria-label="Uždaryti skaičiuoklę"
        className="fixed top-4 right-4 z-[230] inline-flex items-center justify-center h-10 w-10 max-sm:top-3 max-sm:right-3 max-sm:h-9 max-sm:w-9 rounded-sm bg-white text-[#262B33] border border-[#C9CED6] hover:bg-[#F6F7F9] hover:border-[#262B33] print:hidden"
      >
        <X className="w-4 h-4" strokeWidth={2} />
      </button>
      <div ref={hostRef} className="calc-fs h-full overflow-auto" />
    </div>,
    document.body
  );
};

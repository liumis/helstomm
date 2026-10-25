(function () {
  var REG_KEY = 'helstomm-calc-reg';

  function $(sel) {
    return document.querySelector(sel);
  }

  function text(id) {
    var el = document.getElementById(id);
    return el && el.value ? String(el.value).trim() : '';
  }

  function readReg() {
    try {
      return JSON.parse(localStorage.getItem(REG_KEY) || 'null') || {};
    } catch (e) {
      return {};
    }
  }

  function saveReg(data) {
    try {
      localStorage.setItem(REG_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function hasReturningReg() {
    var stored = readReg();
    return Boolean(stored.firstName && stored.lastName && stored.email && stored.company);
  }

  function linkPrivacy(label) {
    if (!label || label.querySelector('a')) return;
    if (label.innerHTML.indexOf('privatumo politika') === -1) return;
    label.innerHTML = label.innerHTML.replace(
      'privatumo politika',
      '<a class="priv" href="/privatumas" target="_top">privatumo politika</a>'
    );
  }

  function prepareGate() {
    var gate = $('#gate');
    if (!gate) return;
    if (!$('#gate-priv-style')) {
      var style = document.createElement('style');
      style.id = 'gate-priv-style';
      style.textContent =
        '.gate a.priv{color:var(--lime-ink,#5F6F0E);font-weight:700;text-decoration:underline}';
      document.head.appendChild(style);
    }
    linkPrivacy(gate.querySelector('label.cb'));
    if (!hasReturningReg()) return;
    var stored = readReg();
    [
      ['r-fn', stored.firstName],
      ['r-ln', stored.lastName],
      ['r-co', stored.company],
      ['r-em', stored.email],
    ].forEach(function (pair) {
      var el = document.getElementById(pair[0]);
      if (!el) return;
      if (!el.value) el.value = pair[1] || '';
      var wrap = el.closest('.fl');
      if (wrap) wrap.hidden = true;
    });
    var ok = $('#r-ok');
    if (ok) ok.checked = true;
    var heading = gate.querySelector('h3');
    var intro = gate.querySelector('p');
    if (heading) {
      var icon = heading.querySelector('svg');
      heading.textContent = '';
      if (icon) heading.appendChild(icon);
      heading.appendChild(document.createTextNode('Kitas projektas'));
    }
    if (intro) {
      intro.textContent = 'Jūs jau registruoti. Užtenka nurodyti projekto pavadinimą.';
    }
  }

  function collectInputs() {
    var out = {};
    document.querySelectorAll('input.in, select.in').forEach(function (el) {
      var label = document.querySelector('label[for="' + el.id + '"]');
      var unit = el.closest('tr') && el.closest('tr').querySelector('.u');
      out[el.id] = {
        label: (label && label.textContent) || el.id,
        value: el.value,
        unit: unit ? unit.textContent : '',
      };
    });
    return out;
  }

  function collectResults() {
    var kpis = Array.prototype.slice
      .call(document.querySelectorAll('#kp > div, .kp > div, .kpis > div'))
      .map(function (node) {
        var k = node.querySelector('.k');
        var v = node.querySelector('.v');
        var s = node.querySelector('.s');
        return {
          k: k ? k.textContent.trim() : '',
          v: v ? v.textContent.trim() : '',
          s: s ? s.textContent.trim() : '',
        };
      });
    var checks = Array.prototype.slice
      .call(document.querySelectorAll('#t1 tr, #tbl tr, #ppl tr, #qty tr'))
      .slice(0, 60)
      .map(function (row) {
        return Array.prototype.slice.call(row.cells).map(function (cell) {
          return cell.innerText.replace(/\s+/g, ' ').trim();
        });
      });
    return { kpis: kpis, checks: checks };
  }

  function calcMeta() {
    var codeEl = $('.code b');
    var titleEl = $('.tstrip h1');
    return {
      code: codeEl ? codeEl.textContent.trim() : '',
      title: titleEl ? titleEl.textContent.trim() : '',
    };
  }

  function summaryFrom(results) {
    return (results.kpis || [])
      .map(function (item) {
        return [item.k, item.v].filter(Boolean).join(': ');
      })
      .filter(Boolean)
      .join(' · ')
      .slice(0, 500);
  }

  function pageUrl() {
    try {
      return window.top && window.top.location ? window.top.location.href : location.href;
    } catch (e) {
      return location.href;
    }
  }

  function postPayload(payload) {
    return fetch('/api/calculator-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  function contactFromForm() {
    var stored = readReg();
    return {
      firstName: text('r-fn') || stored.firstName || '',
      lastName: text('r-ln') || stored.lastName || '',
      email: text('r-em') || stored.email || '',
      company: text('r-co') || stored.company || '',
      projectName: text('r-pr') || stored.projectName || '',
    };
  }

  var prevUnlock = window.unlock;
  if (typeof prevUnlock === 'function' && location.hash !== '#atrakinta') {
    window.unlock = function (pr, co) {
      prevUnlock(pr, co);
      var contact = contactFromForm();
      contact.projectName = contact.projectName || pr || '';
      saveReg(contact);
      var meta = calcMeta();
      var results = collectResults();
      postPayload({
        kind: 'calculation',
        code: meta.code,
        title: meta.title,
        firstName: contact.firstName,
        lastName: contact.lastName,
        name: [contact.firstName, contact.lastName].filter(Boolean).join(' '),
        email: contact.email,
        company: contact.company,
        projectName: contact.projectName,
        summary: summaryFrom(results),
        inputs: collectInputs(),
        results: results,
        pageUrl: pageUrl(),
      }).catch(function () {});
    };
  }

  function ensureAskUi() {
    if ($('#ask-overlay')) return;
    var style = document.createElement('style');
    style.textContent =
      '.ask-overlay{position:fixed;inset:0;background:rgba(38,43,51,.32);z-index:220;display:grid;place-items:center;padding:16px}' +
      '.ask-overlay[hidden]{display:none!important}' +
      '.ask-overlay .gate{position:relative;inset:auto;max-width:560px;width:100%;margin:0;max-height:min(92vh,760px);overflow:auto}' +
      '.ask-overlay textarea{width:100%;min-height:120px;border:1px solid var(--rule);border-radius:3px;padding:8px 10px;font-size:14px;font-family:var(--f);color:var(--ink);resize:vertical}' +
      '.ask-attach{background:var(--lime-soft);border:1px solid var(--lime-line,#E3EDB8);padding:10px 12px;font-size:12.5px;color:#3B475C;margin-top:12px;line-height:1.5}' +
      '.ask-attach b{color:var(--ink)}' +
      '.ask-close{position:absolute;top:12px;right:14px;border:0;background:transparent;font-size:22px;line-height:1;cursor:pointer;color:var(--muted)}';
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'ask-overlay';
    wrap.id = 'ask-overlay';
    wrap.hidden = true;
    wrap.innerHTML =
      '<form class="gate" id="ask-form" novalidate>' +
      '<button type="button" class="ask-close" id="ask-close" aria-label="Uždaryti">×</button>' +
      '<h3><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>' +
      (/^[VS]/.test(calcMeta().code) ? 'Klausti specialisto' : 'Klausti konstruktoriaus') +
      '</h3>' +
      '<p>Atsakymas per 1 darbo dieną. Prie klausimo automatiškai prisegamas šis skaičiavimas.</p>' +
      '<div class="g2">' +
      '<div class="fl"><label for="a-fn">Vardas *</label><input id="a-fn" required autocomplete="given-name"></div>' +
      '<div class="fl"><label for="a-ln">Pavardė *</label><input id="a-ln" required autocomplete="family-name"></div>' +
      '<div class="fl"><label for="a-co">Įmonė *</label><input id="a-co" required autocomplete="organization"></div>' +
      '<div class="fl"><label for="a-em">El. paštas *</label><input id="a-em" type="email" required autocomplete="email"></div>' +
      '<div class="fl full"><label for="a-pr">Projekto pavadinimas *</label><input id="a-pr" required></div>' +
      '<div class="fl full"><label for="a-q">Klausimas *</label><textarea id="a-q" required placeholder="Ką patikrinti, ką keisti, kokią jungtį rinktis…"></textarea></div>' +
      '</div>' +
      '<div class="ask-attach" id="ask-attach"></div>' +
      '<div class="err" id="aerr" hidden>Užpildykite visus laukus.</div>' +
      '<div class="row"><span class="small">Duomenys ir skaičiavimas keliauja į Helstomm projektavimo skyrių.</span>' +
      '<button class="btn dark" type="submit" id="ask-send">Siųsti klausimą →</button></div>' +
      '</form>';
    document.body.appendChild(wrap);

    $('#ask-close').addEventListener('click', closeAsk);
    wrap.addEventListener('click', function (e) {
      if (e.target === wrap) closeAsk();
    });
    $('#ask-form').addEventListener('submit', submitAsk);
  }

  function fillAsk() {
    var contact = contactFromForm();
    var stampPr = $('#s-pr');
    var stampCo = $('#s-co');
    $('#a-fn').value = contact.firstName;
    $('#a-ln').value = contact.lastName;
    $('#a-em').value = contact.email;
    $('#a-co').value = contact.company;
    $('#a-pr').value =
      contact.projectName || (stampPr && stampPr.textContent !== '–' ? stampPr.textContent : '');
    var meta = calcMeta();
    $('#ask-attach').innerHTML =
      '<b>Prisegtas skaičiavimas</b><br>' +
      (meta.code || 'P') +
      (meta.title ? ' · ' + meta.title : '') +
      '<br>Įvestys, rezultatai ir nuoroda į šį lapą';
  }

  function openAsk(e) {
    if (e) e.preventDefault();
    ensureAskUi();
    fillAsk();
    $('#aerr').hidden = true;
    $('#ask-overlay').hidden = false;
    var q = $('#a-q');
    if (q) q.focus();
    try {
      history.replaceState(null, '', '#klausti');
    } catch (err) {}
  }

  function closeAsk() {
    var overlay = $('#ask-overlay');
    if (overlay) overlay.hidden = true;
    if (location.hash === '#klausti') {
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch (err) {}
    }
  }

  function submitAsk(e) {
    e.preventDefault();
    var firstName = text('a-fn');
    var lastName = text('a-ln');
    var company = text('a-co');
    var email = text('a-em');
    var projectName = text('a-pr');
    var question = text('a-q');
    var ok =
      firstName &&
      lastName &&
      company &&
      projectName &&
      question &&
      /\S+@\S+\.\S+/.test(email);
    $('#aerr').hidden = ok;
    if (!ok) return;

    saveReg({ firstName: firstName, lastName: lastName, email: email, company: company, projectName: projectName });
    var meta = calcMeta();
    var results = collectResults();
    var btn = $('#ask-send');
    btn.disabled = true;
    btn.textContent = 'Siunčiama…';

    postPayload({
      kind: 'ask',
      code: meta.code,
      title: meta.title,
      firstName: firstName,
      lastName: lastName,
      name: [firstName, lastName].filter(Boolean).join(' '),
      email: email,
      company: company,
      projectName: projectName,
      question: question,
      summary: summaryFrom(results),
      inputs: collectInputs(),
      results: results,
      pageUrl: pageUrl(),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('fail');
        $('#ask-form').innerHTML =
          '<h3>Klausimas išsiųstas</h3>' +
          '<p>Helstomm projektavimo skyrius atsakys per 1 darbo dieną adresu <b>' +
          email.replace(/</g, '') +
          '</b>.</p>' +
          '<div class="row"><button class="btn dark" type="button" id="ask-done">Uždaryti</button></div>';
        $('#ask-done').addEventListener('click', closeAsk);
      })
      .catch(function () {
        $('#aerr').hidden = false;
        $('#aerr').textContent = 'Nepavyko išsiųsti. Bandykite dar kartą.';
        btn.disabled = false;
        btn.textContent = 'Siųsti klausimą →';
      });
  }

  function openCalc(href) {
    if (!href) return;
    try {
      window.dispatchEvent(new CustomEvent('helstomm-open-calculator', { detail: { href: href } }));
    } catch (err) {}
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href="#klausti"]');
    if (link) openAsk(e);
    var analysis = e.target.closest && e.target.closest('a[href="#analize"]');
    if (analysis) {
      e.preventDefault();
      try {
        window.dispatchEvent(new CustomEvent('helstomm-open-analysis'));
      } catch (err) {}
    }
    var spa = e.target.closest && e.target.closest('a[href^="/skaiciuokles/"]');
    if (spa) {
      e.preventDefault();
      openCalc(spa.getAttribute('href'));
      return;
    }
    var v2 = e.target.closest && e.target.closest('a[href="#v2"], a[href^="HELSTOMM_V2"]');
    if (v2) {
      e.preventDefault();
      var raw = v2.getAttribute('href') || '';
      var query = raw.indexOf('?') >= 0 ? raw.slice(raw.indexOf('?')) : '';
      openCalc('/skaiciuokles/vystytojams/laiko-verte' + query);
      return;
    }
    var v1 = e.target.closest && e.target.closest('a[href="#v1"]');
    if (v1) {
      e.preventDefault();
      openCalc('/skaiciuokles/vystytojams/sienu-kaina');
      return;
    }
    var guide = e.target.closest && e.target.closest('a[href="#vadovas"]');
    if (guide) e.preventDefault();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prepareGate);
  } else {
    prepareGate();
  }

  if (location.hash === '#klausti') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        openAsk();
      });
    } else {
      openAsk();
    }
  }
})();

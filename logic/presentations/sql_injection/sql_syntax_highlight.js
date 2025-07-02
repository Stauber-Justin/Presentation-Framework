// kleine Hilfsfunktion zum Escapen
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function initSyntaxHighlight() {
  const KEYWORDS = ['CREATE','PROCEDURE','AS','BEGIN','END','SELECT','FROM','WHERE','AND','OR','NVARCHAR(50)'];

  document.querySelectorAll('code.codeblock-sql').forEach(codeEl => {
    let txt = codeEl.textContent;

    // 1) HTML escapen (<,>,&)
    txt = escapeHTML(txt);

    // 2) Kommentar (-- bis Zeilenende) als Marker extrahieren
    let comment = '';
    txt = txt.replace(/(--.*)$/gm, (_, c) => {
      comment = c;
      return '[[COM]]';
    });

    // 3) SQL-Symbole markieren, bevor Tags kommen
    txt = txt
      .replace(/=/g, '[[EQ]]')
      .replace(/;/g, '[[SC]]');

    // 4) Strings highlighten
    txt = txt.replace(/'([^']*)'/g,
      `<span class="sql-string">'$1'</span>`);

    // 5) Keywords highlighten (nach Strings, vor Symbolen)
    KEYWORDS.forEach(kw => {
      const re = new RegExp('\\b'+kw+'\\b','gi');
      txt = txt.replace(re, m =>
        `<span class="sql-keyword">${m.toUpperCase()}</span>`
      );
    });

    // 6) Marker zurück in <span>-Symbole
    txt = txt
      .replace(/\[\[EQ\]\]/g, '<span class="sql-symbol">=</span>')
      .replace(/\[\[SC\]\]/g, '<span class="sql-symbol">;</span>');

    // 7) Kommentar-Marker gegen echt gestylten Kommentar tauschen
    if (comment) {
      txt = txt.replace('[[COM]]',
        `<span class="sql-comment">${escapeHTML(comment)}</span>`);
    }

    // 8) Ergebnis rendern
    codeEl.innerHTML = txt;
  });
}

if (document.readyState !== 'loading') initSyntaxHighlight();
else document.addEventListener('DOMContentLoaded', initSyntaxHighlight);

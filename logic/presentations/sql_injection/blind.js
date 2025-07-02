function updateBlindPreview() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  const sqlBox = document.getElementById('sql-query');

  const raw = `SELECT * FROM users WHERE username = '${u}' AND password = '${p}';`;

  // Kommentar extrahieren (vor allem anderen!)
let comment = "";
let rawNoComment = raw.replace(/(--.*)$/, (match, p1) => {
  comment = p1;
  return '[[COMMENT_MARKER]]';
});

let escaped = escapeMinimal(rawNoComment)
  .replace(/=/g, '[[EQ]]');

// Highlight SQL
let highlighted = escaped
  .replace(/\b(SELECT|FROM|WHERE|AND|OR|COMMIT)\b/gi, '<span class="sql-keyword">$1</span>')
  .replace(/'([^']*)'/g, "<span class='sql-string'>'$1'</span>")
  .replace(/\[\[EQ\]\]/g, '<span class="sql-symbol">=</span>')
  .replace(/\*/g, '<span class="sql-symbol">*</span>')
  .replace(/;/g, '<span class="sql-symbol">;</span>');

// Füge Kommentar ganz am Ende als grauen Block wieder an
if (comment) {
  highlighted = highlighted.replace('[[COMMENT_MARKER]]',
    `<span class="sql-comment">${escapeMinimal(comment)}</span>`);
}

sqlBox.innerHTML = highlighted;
  document.getElementById('login-result').textContent = '';
}

function escapeMinimal(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}


function fakeBlind() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const resultBox = document.getElementById('login-result');

  resultBox.textContent = "Warte auf Antwort...";
  resultBox.style.color = "#aaa";

  setTimeout(() => {
    const u = username.toLowerCase();
    const p = password.toLowerCase();

    const isInjection = (
      u.includes("or 1=1") || p.includes("or 1=1") ||
      u.includes("' or") || p.includes("' or") ||
      (u.includes("=") && p.includes("="))
    );

    const isValid = (username === "admin" && password === "admin123");

    if (isValid || isInjection) {
      resultBox.textContent = "Login erfolgreich.";
      resultBox.style.color = "#00ff88";
    } else if (username === "" || password === "") {
      resultBox.textContent = "Bitte beide Felder ausfüllen.";
      resultBox.style.color = "#ffcc00";
    } else {
      resultBox.textContent = "Login fehlgeschlagen.";
      resultBox.style.color = "#ff4444";
    }
  }, 1000);
}

function initBlind() {
  const inputs = document.querySelectorAll('#username, #password');
  inputs.forEach(input => input.addEventListener('input', updateBlindPreview));
  updateBlindPreview();
}

if (document.readyState !== 'loading') initBlind();
else document.addEventListener('DOMContentLoaded', initBlind);

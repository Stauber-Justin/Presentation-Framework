// Nur minimale HTML-Escapes für <, > und &
function escapeMinimal(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function updateNonBlindPreview() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const sqlBox = document.getElementById('sql-query');

  // 1) Roh-Query bauen
  const raw = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`;

  // 2) Kommentar extrahieren
  let comment = "";
  let noComment = raw.replace(/(--.*)$/g, (_, c) => {
    comment = c;
    return "[[COMMENT]]";
  });

  // 3) Nur <,>,& escapen
  let v = escapeMinimal(noComment);

  // 4) Marker für Symbole setzen
  v = v
    .replace(/=/g, "[[EQ]]")
    .replace(/;/g, "[[SC]]")
    .replace(/\*/g, "[[STAR]]");

  // 5) Keywords & Strings highlighten
  let highlighted = v
    .replace(/\b(SELECT|FROM|WHERE|AND|OR|LIKE|NOT|NULL|IS|COMMIT)\b/gi,
             '<span class="sql-keyword">$1</span>')
    .replace(/'([^']*)'/g,
             "<span class='sql-string'>'$1'</span>");

  // 6) Marker zurück in Symbol-Spans
  highlighted = highlighted
    .replace(/\[\[EQ\]\]/g, '<span class="sql-symbol">=</span>')
    .replace(/\[\[SC\]\]/g, '<span class="sql-symbol">;</span>')
    .replace(/\[\[STAR\]\]/g, '<span class="sql-symbol">*</span>');

  // 7) Kommentar-Marker ersetzen
  if (comment) {
    highlighted = highlighted.replace(
      "[[COMMENT]]",
      `<span class="sql-comment">${escapeMinimal(comment)}</span>`
    );
  }

  // 8) Rendern
  sqlBox.innerHTML = highlighted;
  document.getElementById('login-result').textContent = "";
}

function fakeLogin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const resultBox = document.getElementById('login-result');

  resultBox.textContent = "Warte auf Antwort...";
  resultBox.style.color = "#aaa";

  setTimeout(() => {
    const u = username.toLowerCase();
    const p = password;

    const knownUsers = {
      "admin": "admin123",
      "hacker": "sqlpower",
      "numbo": "RepusDrowssap"
    };

    // ⚠️ Tabelle wird geleakt wenn Passwort "SELECT" enthält
    if (p.toUpperCase().includes("SELECT")) {
      resultBox.innerHTML = `
        <strong>⚠️ Datenbankantwort:</strong><br>
        <code>user_id: 1  | username: admin  | password: admin123</code><br>
        <code>user_id: 42 | username: numbo  | password: RepusDrowssap</code><br>
        <em>Hinweis: Die Datenbank hat sensible Inhalte offengelegt!</em>
      `;
      resultBox.style.color = "#ffaa00";
      return;
    }

    if (!username || !password) {
      resultBox.textContent = "Bitte beide Felder ausfüllen.";
      resultBox.style.color = "#ffcc00";
      return;
    }

    const userExists = u in knownUsers;
    const passwordCorrect = userExists && knownUsers[u] === p;
    const isBypassInjection = p.includes("' OR 1=1 --");

    if (passwordCorrect) {
      resultBox.innerHTML = `Willkommen <strong>${username}</strong>!`;
      resultBox.style.color = "#00ff88";
    } else if (userExists && isBypassInjection) {
      resultBox.innerHTML = `<strong>Injection erfolgreich!</strong><br>Willkommen <strong>${username}</strong>!`;
      resultBox.style.color = "#00ff88";
    } else if (!userExists) {
      resultBox.textContent = "Fehler: Benutzer nicht gefunden.";
      resultBox.style.color = "#ff4444";
    } else {
      resultBox.textContent = "Fehler: Benutzername oder Passwort falsch.";
      resultBox.style.color = "#ff4444";
    }
  }, 1000);
}



document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#username, #password').forEach(input =>
    input.addEventListener('input', updateNonBlindPreview)
  );
  updateNonBlindPreview();
});

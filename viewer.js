function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;');
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*?"(?=:))|("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*?")|(\b\d+(?:\.\d+)?\b)|\b(true|false|null)\b/g,
    function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? 'key' : 'string';
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    }
  );
}

const params = new URLSearchParams(window.location.search);
const raw = params.get("data");

if (raw) {
  try {
    const obj = JSON.parse(decodeURIComponent(raw));
    const pretty = JSON.stringify(obj, null, 2);
    document.getElementById("json").innerHTML = syntaxHighlight(pretty);
  } catch (e) {
    document.getElementById("json").textContent = "Invalid JSON.";
  }
} else {
  document.getElementById("json").textContent = "No JSON provided.";
}

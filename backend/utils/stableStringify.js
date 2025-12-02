// src/utils/stableStringify.js
export function stableStringify(obj) {
  const seen = new WeakSet();
  function _stringify(x) {
    if (x === null || typeof x !== "object") return JSON.stringify(x);
    if (seen.has(x)) return '"[Circular]"';
    seen.add(x);
    if (Array.isArray(x)) return "[" + x.map(_stringify).join(",") + "]";
    const keys = Object.keys(x).sort();
    return "{" + keys.map(k => JSON.stringify(k) + ":" + _stringify(x[k])).join(",") + "}";
  }
  return _stringify(obj);
}

(function () {
  var root = document.documentElement;
  var preference = window.matchMedia('(prefers-color-scheme: dark)');
  var storageKey = 'site-theme';
  try {
    var saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch (_) {}

  function isDark() {
    return root.dataset.theme ? root.dataset.theme === 'dark' : preference.matches;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    function updateButton() {
      var label = isDark() ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(isDark()));
    }
    button.addEventListener('click', function () {
      var theme = isDark() ? 'light' : 'dark';
      root.dataset.theme = theme;
      try { localStorage.setItem(storageKey, theme); } catch (_) {}
      updateButton();
    });
    preference.addEventListener('change', updateButton);
    updateButton();
    button.hidden = false;
  });
})();

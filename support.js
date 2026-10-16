// Copy-to-clipboard buttons on the support page.
document.querySelectorAll("button[data-copy]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var target = document.getElementById(btn.dataset.copy);
    var text = target.textContent.trim();

    var done = function () {
      var old = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(function () {
        btn.textContent = old;
      }, 1500);
    };

    // Fallback: select the text so the user can copy it manually.
    var select = function () {
      window.getSelection().selectAllChildren(target);
    };

    try {
      navigator.clipboard.writeText(text).then(done, select);
    } catch (e) {
      select();
    }
  });
});

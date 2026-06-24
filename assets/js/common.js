$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });

    // Set data-toc-text on bilingual headings to only the active language's text,
    // preventing bootstrap-toc from concatenating both EN and ZH spans.
    // Use jQuery's .data() (not .attr()) so bootstrap-toc's .data("toc-text") reads
    // the updated value instead of the stale jQuery-internal cache.
    var updateTocText = function () {
      var lang = document.documentElement.getAttribute("data-language") || "en";
      $("h1, h2, h3, h4, h5, h6").each(function () {
        var $active = $(this).find('[data-lang="' + lang + '"]');
        if ($active.length) {
          $(this).data("toc-text", $active.text().trim());
        }
      });
    };

    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);

    updateTocText();
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });

    // Rebuild TOC when language is toggled
    var tocLangObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "data-language") {
          updateTocText();
          $myNav.empty();
          Toc.init($myNav);
        }
      });
    });
    tocLangObserver.observe(document.documentElement, { attributes: true });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});

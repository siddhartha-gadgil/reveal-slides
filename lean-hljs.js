(function() {

  function lean(hljs) {
    const KEYWORDS = {
      $pattern: /\w+|λ|∀|Π|∃|:=?/u,
      keyword:
        "theorem lemma definition def class structure instance example " +
        "inductive coinductive axiom axioms hypothesis constant constants " +
        "universe universes variable variables parameter parameters begin end " +
        "infix infixr import open theory prelude renaming hiding exposing calc " +
        "match do by let in extends fun assume #check #eval #reduce #print λ ∀ ∃ Π",
      literal: "tt ff",
      meta: "noncomputable private protected meta mutual",
      section: "section namespace end",
      symbol: ":="
    };

    const COMMENT1 = hljs.COMMENT("--", "$");
    const COMMENT2 = hljs.COMMENT("/-[^-]", "-/");

    const THEOREM = {
      className: "theorem",
      beginKeywords: "def theorem lemma class instance structure",
      end: /:=/,
      excludeEnd: true,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: /[A-Za-z_][\w']*/
        }),
        { className: "symbol", begin: /:=/, endsParent: true }
      ],
      keywords: KEYWORDS
    };

    return {
      name: "lean",
      keywords: KEYWORDS,
      contains: [
        hljs.QUOTE_STRING_MODE,
        hljs.NUMBER_MODE,
        COMMENT1,
        COMMENT2,
        THEOREM
      ]
    };
  }

  // Register with global hljs (browser)
  if (typeof window !== "undefined" && window.hljs) {
    window.hljs.registerLanguage("lean", lean);
  }

})();

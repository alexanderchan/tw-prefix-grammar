# tw-prefix-grammar README

This adds a tailwind prefix grammar to search for tw prefixes in any string or template string.

## Features

This adds a `keyword.twprefix` to the grammar so it can be highlighted in any string or string template. It currently only matches `tw*-` and `gd-*`

## Local installation

```
$ pnpm run package
$ pnpm run install:vscode
```

## Customize the syntax highlighting

cmd-shift-p then open `Preferences: Open User Settings(JSON)` and add or update the section:

```
 "editor.tokenColorCustomizations": {
    "[*Light*]": {
      "textMateRules": [
        {
          "scope": "keyword.twprefix",
          "settings": {
            "foreground": "#648add9e"
          }
        }
      ]
    },
    "[*Dark*]": {
      "textMateRules": [
        {
          "scope": "keyword.twprefix",
          "settings": {
            "foreground": "#648add9e"
          }
        },
      ]
    }
  }
```

## Known Issues

This is a grammar injection rather than a language server because it is very fast to create. If you need your own prefixes, customize `syntaxes/injection.json` and add them there.

## References

- [syntax highlight guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [color themes](https://code.visualstudio.com/api/extension-guides/color-theme#syntax-colors)

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

## Credits

Prefix commands are from:

https://github.com/yensubldg/prefix-class-vscode

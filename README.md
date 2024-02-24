# tw-prefix-grammar README

This adds a tailwind prefix grammar to search for tw prefixes in any string or template string.

## Features

This adds

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

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: Enable/disable this extension.
- `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

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

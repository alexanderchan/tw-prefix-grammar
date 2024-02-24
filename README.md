# tw-prefix-grammar README

This adds a tailwind prefix grammar to search for tw prefixes in any string or template string.

![Usage](images/usage.gif)

## Features

This adds a `keyword.twprefix` to the grammar so it can be highlighted in any string or string template. It currently only matches `tw*-` and `gd-*`.

Adds a command to "Prefix tailwind classes".

## Usage

To use this extension, follow these steps:

To use this extension, follow these steps:

1. Select the text that you want to modify (if you want to modify the entire file, you can skip this step).
2. Open the command palette (press `Ctrl+Shift+P` on Windows or `Cmd+Shift+P` on Mac).
3. Type "Prefix tailwind" and select the "Prefix tailwind calsses in selection".
4. Enter the prefix that you want to add to the class names.
5. Input prefix (ie tw-) will be added to all class names in the selected text.
6. Press "Enter" to apply the prefix.

## Customize the syntax highlighting

cmd-shift-p then open `Preferences: Open User Settings(JSON)` and add or update the section and customize with your colors:

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

## Local installation

- To start using your extension with Visual Studio Code copy it into the `~/.vscode/extensions` folder and restart Code.

## Install your extension

- To share your extension with the world, read on https://code.visualstudio.com/docs about publishing an extension.

```sh
$ pnpm run package
$ pnpm run install:vscode # test local install
```

## Known Issues

This is a grammar injection rather than a language server because it is very fast to create. If you need your own prefixes, customize `syntaxes/injection.json` and add them there.

## Future enhancements

Add a workspace setting to default the prefix or read it from the tailwind config.

## References

- [syntax highlight guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [color themes](https://code.visualstudio.com/api/extension-guides/color-theme#syntax-colors)

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

## Credits

Prefixing commands based on code from:

https://github.com/yensubldg/prefix-class-vscode

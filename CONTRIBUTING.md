## Running in debug

Open this folder in vscode and run with `F5` to open a test instance.

## Local installation

- To start using your extension with Visual Studio Code copy it into the `~/.vscode/extensions` folder and restart Code.

## Install your extension

- To share your extension with the world, read on https://code.visualstudio.com/docs about publishing an extension.

```sh
$ pnpm run package
$ pnpm run install:vscode # test local install
```

## Adding to vscode store

It's easier to just upload via the manage extension https://marketplace.visualstudio.com/manage/publishers ui if not updating frequently or via ci/cd.

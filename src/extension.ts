// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

function convertToClassName(name: string, prefix: string) {
  let result = name
    .split(' ')
    .map((c: string) => {
      if (c.includes(prefix)) {
        return c
      }

      if (c.includes(':')) {
        // get last part of class name
        let lastPart = c.split(':').pop()
        if (lastPart && !lastPart.startsWith(prefix)) {
          return c.replace(lastPart, prefix + lastPart)
        }
      }
      return prefix + c
    })
    .join(' ')

  return result
}

// should try to read this from the tw config file
// the same way that the tailwindcss intellisense does
function changePrefix({
  prefix = 'tw-',
  type = 0,
}: {
  prefix?: string
  type?: number
}) {
  let editor = vscode.window.activeTextEditor
  if (!editor) {
    return
  }

  let document = editor.document
  let selection = editor.selection
  let text = document.getText(selection)

  let className = text.match(/(?<=class(?:Name)?=")(.*?)(?=")/g)
  let newText = ''
  switch (type) {
    case 0: // from string
      newText = convertToClassName(text, prefix)
      break
    case 1: // from html
      if (!className) {
        return
      }
      className.forEach((s: string) => {
        let newClass = convertToClassName(s, prefix)
        // replace old class name with new class name
        text = text.replace(s, newClass)
      })
      newText = text
      break
    default:
      newText = text
  }

  editor.edit((builder: vscode.TextEditorEdit) => {
    builder.replace(selection, newText)
  })
}

let lastPrefix = 'tw-'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "prefixclass" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let fromString = vscode.commands.registerCommand(
    'prefixclass.changePrefixFromString',
    () => {
      vscode.window
        .showInputBox({ prompt: `Enter new prefix for:`, value: lastPrefix })
        .then((prefix: string | undefined) => {
          lastPrefix = prefix || lastPrefix
          changePrefix({ prefix, type: 0 })
        })
    }
  )

  let fromHtml = vscode.commands.registerCommand(
    'prefixclass.changePrefixFromHtml',
    () => {
      vscode.window
        .showInputBox({ prompt: `Enter new prefix for:`, value: lastPrefix })
        .then((prefix: string | undefined) => {
          lastPrefix = prefix || lastPrefix
          changePrefix({ prefix, type: 1 })
        })
    }
  )

  const subscriptions = [fromString, fromHtml]

  context.subscriptions.push(...subscriptions)
}

// This method is called when your extension is deactivated
export function deactivate() {}

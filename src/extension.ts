// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

export function replaceClassesWithPrefix({
  classes,
  prefix,
}: {
  classes: string
  prefix: string
}) {
  if (!classes) {
    return ''
  }

  // split the classes at the space
  const splitClasses = classes?.split(' ')

  // add the prefix to the classes that don't have it
  const classesWithPrefixAdded = splitClasses.map((c) => {
    // ignore if it already has the prefix
    if (c.includes(prefix)) {
      return c
    }

    // modifiers need the replacement after the modifier
    if (c.includes(':')) {
      const [modifier, replacement] = c.split(':')
      return modifier + ':' + prefix + replacement
    }

    // starts with a quote
    if (/^['`"]/.test(c)) {
      return c.replace(/(['`"])(.*)/, `$1${prefix}$2`)
    }

    if (c.startsWith(prefix)) {
      return c
    } else {
      return prefix + c
    }
  })
  // join the classes back together

  return classesWithPrefixAdded.join(' ')
}

export function simpleCodeReplacer({
  code,
  prefix,
}: {
  code: string
  prefix: string
}) {
  // Input string
  // Regular expression to match contents between quotes, backticks, or single quotes
  const regex = /["`'](.*?)["'`]/gim
  const inputString = code

  // Replacement function
  const replacedString = inputString.replace(regex, (match, captureGroup) => {
    // Replace captured group with desired replacement
    return replaceClassesWithPrefix({
      classes: match,
      prefix,
    })
  })

  return replacedString
}

// should try to read this from the tw config file
// the same way that the tailwindcss intellisense does
function changePrefix({
  prefix = 'tw-',
  type = 'string',
}: {
  prefix?: string
  type?: 'string' | 'html'
}) {
  let editor = vscode.window.activeTextEditor
  if (!editor) {
    return
  }

  let document = editor.document
  let selection = editor.selection
  let text = document.getText(selection)

  let newText = simpleCodeReplacer({ code: text, prefix })

  editor.edit((builder: vscode.TextEditorEdit) => {
    builder.replace(selection, newText)
  })
}

let lastPrefix = ''

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let fromString = vscode.commands.registerCommand(
    'prefixclass.changePrefixFromString',
    () => {
      const configPrefix = vscode.workspace
        .getConfiguration('tailwindPrefixer')
        .get('prefix', 'tw-')

      vscode.window
        .showInputBox({
          prompt: `Enter new prefix (including a dash -):`,
          value: lastPrefix || configPrefix,
        })
        .then((prefix: string | undefined) => {
          if (prefix) {
            lastPrefix = prefix || lastPrefix
            changePrefix({ prefix, type: 'string' })
          }
        })
    }
  )

  const subscriptions = [fromString]

  context.subscriptions.push(...subscriptions)
}

// This method is called when your extension is deactivated
export function deactivate() {}

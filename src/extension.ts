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

  console.log({ code })
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

function convertToClassName({
  name,
  prefix,
}: {
  name: string
  prefix: string
}) {
  let result = name
    .split(' ')
    .map((className: string) => {
      if (className.includes(prefix)) {
        return className
      }

      if (className.includes(':')) {
        // get last part of class name
        let lastPart = className.split(':').pop()
        if (lastPart && !lastPart.startsWith(prefix)) {
          return className.replace(lastPart, prefix + lastPart)
        }
      }
      return prefix + className
    })
    .join(' ')

  return result
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

  let classNames = text.match(
    /(?<=class(?:Name)?=\{?.*["`'])(.*?)(?=["`'])\}?/g
  )
  let newText = ''
  switch (type) {
    case 'string': // from string
      // newText = convertToClassName(text, prefix)
      newText = simpleCodeReplacer({ code: text, prefix })
      break
    case 'html': // from html
      if (!classNames) {
        return
      }
      classNames.forEach((className) => {
        let newClass = convertToClassName({ name: className, prefix })
        // let newClass = replaceClassesWithPrefix({ classes: className, prefix })
        // replace old class name with new class name
        text = text.replace(className, newClass)
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
          changePrefix({ prefix, type: 'string' })
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
          changePrefix({ prefix, type: 'html' })
        })
    }
  )

  const subscriptions = [fromString, fromHtml]

  context.subscriptions.push(...subscriptions)
}

// This method is called when your extension is deactivated
export function deactivate() {}

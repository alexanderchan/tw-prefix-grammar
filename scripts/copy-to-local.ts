#!/usr/bin/env zx
import { $ } from 'zx'

import fs from 'fs'

const packageJson = JSON.parse(
  fs.readFileSync(process.cwd() + '/package.json', 'utf8')
)

async function main() {
  await $`cp ./dist/extension.js ~/.vscode/extensions/alexmchan.tw-prefix-grammar-${packageJson?.version}/dist`
  await $`cp ./package.json ~/.vscode/extensions/alexmchan.tw-prefix-grammar-${packageJson?.version}/`
}

main()

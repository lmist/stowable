/* i am tired makefiles, thank you Jared */
import {$} from 'bun'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


async function stow(all = 'yes') {
    try {
	await stowVsc()
    } catch (err) {
	console.error(`error stowing vscode configs`)
	console.error(err)
    }

    try {
	await stowWm()
    } catch (err) {
	console.error(`error stowing wm configs`)
	console.error(err)
    }
}

async function stowVsc() {
    const {stdout, stderr} = await $`code --list-extensions --show-versions > vscode-extensions`.quiet()
    console.log('backed up vs code configs')
}

async function stowWm() {
    let {stdout, stderr} = await $`cp ~/komorebi.json $(PWD)`.quiet()
    console.log('backed up komorebi.json ')

    let {stdout, stderr} = await $`cp ~/.config/whkdrc $(PWD)/config`.quiet()
    console.log('backed up whkdrc ')
}

yargs(hideBin(process.argv))
    .command(
        'run <stowop>',
        'Runs a stowop',
        (yargs) =>
            yargs.positional('which', {
                description: 'The stow operation to run',
                type: 'string',
            }),
        (argv) => stow(),
    )
    .parse()

#!/usr/bin/env bun

import {$} from 'bun'

try {
    console.log("stopping wm")
    await stopKomorebi()
} catch (err) {
    console.log("failed to stop, it might not be running")
}

await startKomorebi()


async function startKomorebi() {
    const {stdout, stderr} = await $`komorebic start --whkd`.quiet()
}

async function stopKomorebi() {
const {stdout, stderr} = await $`wmic process where "name='komorebi.exe'" delete && \
wmic process where "name='whkd.exe'" delete`.quiet()
}

#!/usr/bin/env bun

import {$} from 'bun'

try {
    await stopKomorebi()
} catch (err) {
    console.log("failed to stop, it might not be running")
}

await startKomorebi()


async function startKomorebi() {
    const {stdout, stderr} = await $`komorebic start --whkd`.quiet()
}

async function stopKomorebi() {
    const {stdout, stderr} = await $`taskkill /f /im komorebi.exe; taskkill /f /im whkd.exe`.quiet()
}

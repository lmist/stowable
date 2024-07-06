'use strict'
/**
 * A utility script for setting up AWS CLI and SAM CLI on remote desktops such as GitHub Codespaces or Google Cloud Console.
 * It installs the AWS CLI and SAM CLI directly on the remote desktop, allowing for portability and ease of use.
 *
 * Use case:
 * - Connect to a remote desktop such as GitHub Codespaces or Google Cloud Console
 * - Run this script to install AWS CLI and SAM CLI
 * - Use AWS CLI and SAM CLI to manage AWS resources directly from the remote desktop
 */

/* visit https://bun.sh/docs/installation for installing bun */
/* read about bun's shell symbol, the `$`, on https://bun.sh/docs/runtime/shell */
import { $ } from 'bun'

async function main() {
    /**
     * Executes the main function, which installs the AWS SAM CLI and AWS CLI.
     *
     * @return {Promise<void>} A promise that resolves when the installation is complete.
     * @throws {Error} If there is an error during the installation process.
     */
    try {
        await installSamCli()
        await installAwsCli()
    } catch (error) {
        $.error(error.message)
        exit(1)
    }
}

main()

async function installSamCli() {
    /**
     * Installs the AWS SAM CLI by downloading it from the latest release on GitHub,
     * extracting it to a temporary directory, installing it, and testing that it
     * correctly linked to the PATH.
     *
     * @return {Promise<void>} A promise that resolves when the installation is complete.
     */
    const { stdout, stderr } = await $`cd /tmp && \
    wget https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip \
    && unzip aws-sam-cli-linux-x86_64.zip -d sam-installation \
    && sudo ./sam-installation/install \
    && sam --version && rm -rf /tmp/` /* Test that it correctly linked to path */
}

async function installAwsCli() {
    /**
     * Installs the AWS CLI by downloading it from the latest release on GitHub,
     * extracting it to a temporary directory, and installing it.
     *
     * @return {Promise<void>} A promise that resolves when the installation is complete.
     */
    await $`cd /tmp && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && sudo ./aws/install`
}

import * as core from '@actions/core'
import {ChromeWebStore} from "webextension-store";
import {getWebStoreInputs, ChromeInputs} from "./get_inputs.js";

/**
 * Runs the Chrome store logic
 * @param inp Chrome Store inputs
 */
async function runChrome(inp: ChromeInputs): Promise<void> {
    try {
        core.info(`Uploading Chrome extension ${inp.extensionId}...`)

        const store = new ChromeWebStore(
            inp.extensionId,
            inp.clientId,
            inp.refreshToken,
            inp.clientSecret,
        );
        const chrome_res = await store.uploadExisting(inp.file)
        core.info(JSON.stringify(chrome_res))
        if (inp.publish) {
            const publish_res = await store.publish()
            core.info(JSON.stringify(publish_res))
        }
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

/**
 * Run all
 */
async function run(): Promise<void> {
    if(core.getInput("test")) {
        core.info("Skipping workflow due to test flag")
        return
    }
    core.info("Running webstore upload workflow.")
    const inputs = getWebStoreInputs()
    await runChrome(inputs)
}

run().then()

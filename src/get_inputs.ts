import * as core from '@actions/core'

export interface ChromeInputs {
    extensionId: string
    clientId: string
    refreshToken: string
    clientSecret?: string
    file: string
    publish: boolean
}

/**
 * Gets input for this action from Actions API
 */
export function getWebStoreInputs(): ChromeInputs {
    const inp = {
        extensionId: core.getInput("chrome_extension_id", {required: true}),
        clientId: core.getInput("client_id", {required: true}),
        refreshToken: core.getInput("refresh_token", {required: true}),
        clientSecret: core.getInput("client_secret", {required: true}),
        file: core.getInput("file", {required: true}),
        publish: core.getBooleanInput("publish")
    }
    return inp
}

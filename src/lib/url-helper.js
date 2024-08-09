export const urls = {
    network: networkId => `/${networkId}`,
    block: ( networkId, blockSelector ) => `/${networkId}/${blockSelector}`
}
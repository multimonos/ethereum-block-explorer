export const urls = {
    network: networkId => `/${networkId}`,
    block: ( networkId, blockSelector = 'latest' ) => `/${networkId}/blocks/${blockSelector}`,
    txn: ( networkId, txnId ) => `/${networkId}/txns/${txnId}`,
    address: ( networkId, address ) => `/${networkId}/address/${address}`
}
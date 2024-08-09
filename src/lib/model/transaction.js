export const findTransaction = async ( provider, tid ) =>
    await provider.getTransaction( tid )

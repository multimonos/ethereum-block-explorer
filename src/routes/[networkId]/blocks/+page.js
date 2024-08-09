import { redirect } from "@sveltejs/kit";
import { urls } from "$lib/url-helper.js";

export async function load( { params } ) {
    redirect( 302, urls.block( params.networkId ) )
}
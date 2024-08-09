import { createBlockPages, findBlockOrLatest } from "$lib/model/block.js";
import { findNetwork } from "$lib/model/network.js";
import { redirect } from "@sveltejs/kit";

export async function load( { params } ) {
    redirect(302,`/${params.networkId}/latest`)
}
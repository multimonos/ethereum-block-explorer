import { derived } from "svelte/store";
import { ethers } from "ethers";
import { networks } from "$lib/model/network.js";

export const createProvider = url =>
    new ethers.JsonRpcProvider( url )

export const createProviderFromNetwork = network =>
    createProvider( network.url )

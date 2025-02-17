import { Client } from "../mod.ts";
import { Base } from "./Base.ts";

export interface BaseChannelStructure {
	id: any
	type: number
}

export class BaseChannel extends Base{
	constructor(client: Client){
		super(client)
	}
}
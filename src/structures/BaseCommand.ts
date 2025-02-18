import { Client } from "../mod.ts";
import { Base } from "./mod.ts";

export interface CommandPayload {
	name: string,
	isGlobal: boolean,

}
export class BaseCommand extends Base implements CommandPayload {
	readonly name: string;
	readonly isGlobal: boolean;
	constructor(client: Client, name: string, isGlobal: boolean){
		super(client);
		this.name = name;
		this.isGlobal = isGlobal;
	}
	
}
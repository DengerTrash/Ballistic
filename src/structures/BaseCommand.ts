import { Client } from "../mod.ts";
import { Base } from "./mod.ts";

export interface CommandPayload {
	name: string,
	onlyGuild?: (string)[],
	description: string,
	execute: (event: any) => Promise<void>
}
export interface CommandStructure extends CommandPayload {
	type: number;
}
export abstract class BaseCommand extends Base implements CommandPayload {
	readonly name: string;
	readonly onlyGuild: string[] | undefined;
	readonly description: string;
	readonly execute: (event: any) => Promise<void>;
	constructor(client: Client, data: CommandStructure){
		super(client);
		this.name = data.name;
		this.onlyGuild = data.onlyGuild;
		this.description = data.description
		this.execute = data.execute
	}
	
}
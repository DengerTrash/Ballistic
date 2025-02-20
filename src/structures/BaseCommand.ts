import { Client, CommonEvents } from "../mod.ts";
import { Base } from "./mod.ts";

export interface CommandPayload {
	name: string,
	onlyGuild?: (string)[],
	description: string,
	execute: (event: CommonEvents) => Promise<void>
}
export interface CommandStructure extends Omit<CommandPayload, 'execute'> {
}
export abstract class BaseCommand extends Base implements CommandStructure {
	readonly name: string;
	readonly onlyGuild: string[] | undefined;
	readonly description: string;
	constructor(client: Client, data: CommandPayload){
		super(client);
		this.name = data.name;
		this.onlyGuild = data.onlyGuild;
		this.description = data.description
	}
	
}
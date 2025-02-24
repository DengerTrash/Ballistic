import type { Client } from "../../mod.ts";
import { Base } from "../mod.ts";
import type { SlashCommandEvents } from "./SlashCommand.ts";
import { CommandOptions, Localizations, SubCommand } from './SlashCommandOption.ts';

/**
 * slash等のメソッド用のinterfaceです。
 */
export interface CommandPayload {
	name: string,
	name_localizations?: Localizations;
	onlyGuild?: (string)[];
	subCommand?: Array<SubCommand>;
	options?: CommandOptions,
	description: string;
	description_localizations?: Localizations;
	execute: (event: SlashCommandEvents) => Promise<void>
}

/**
 * 実際にREST APIで送信するため、commandPayloadからexecuteを除去したinterfaceです。
 */
export interface CommandStructure extends Omit<CommandPayload, 'execute' | 'onlyGuild'> {
}

export function commandDataConverter(data: CommandPayload): CommandStructure{
	const doit:CommandStructure = {
		name: data.name,
		name_localizations: data.name_localizations,
		description: data.description,
		description_localizations: data.description_localizations,
	}

	return doit;
}

/**
 * コマンドのベースです。
 */
export abstract class Command extends Base implements CommandStructure {
	readonly name: string;
	readonly onlyGuild: string[] | undefined;
	readonly description: string;

	/**
	 * base実装なのでクライアントが必要です。
	 * @param client 
	 * @param data 
	 */
	constructor(client: Client, data: CommandPayload){
		super(client);
		this.name = data.name;
		this.onlyGuild = data.onlyGuild;
		this.description = data.description
	}
	
}
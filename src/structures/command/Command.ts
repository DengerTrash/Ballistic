import type { Client } from "../../mod.ts";
import { Base } from "../mod.ts";
import type { SlashCommandEvents } from "./SlashCommand.ts";

/**
 * slash等のメソッド用のinterfaceです。
 */
export interface CommandPayload {
	name: string,
	onlyGuild?: (string)[],
	option?:(CommandOption)[]
	description: string,
	execute: (event: SlashCommandEvents) => Promise<void>
}

export const CommandOptionType = {
	subCommand: '1',
}
const nk: CommandOption = {
	type: 'subCommand'
}
export interface CommandOption {
	type: (typeof CommandOptionType)[keyof typeof CommandOptionType]
}
/**
 * 実際にREST APIで送信するため、commandPayloadからexecuteを除去したinterfaceです。
 */
export interface CommandStructure extends Omit<CommandPayload, 'execute'> {
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
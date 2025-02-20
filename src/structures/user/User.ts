import type { Client } from "../../mod.ts";
import { Base } from "../base/Base.ts";

export interface BaseUserStructure {
	id: string,
	username: string,
	descriminator: string,
	global_name: string,
	avatar: string,
	bot?: boolean,
	system?: boolean,
	mfa_enabled?: boolean,
	banner?: string,
	accent_color?: string,
	locale?: string,
	verified?: boolean,
	email?: string,
	flags?: string,
	premium_type?: string,
	public_flags?: string,
	avatar_decoration_data?: string
}

/**
 * User用のBaseです。現在未使用です。
 */
export class User extends Base{
	constructor(client: Client){
		super(client)
	}
}
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
export class User extends Base implements BaseUserStructure{
	id: string;
	username: string;
	descriminator: string;
	global_name: string;
	avatar: string;
	bot?: boolean | undefined;
	system?: boolean | undefined;
	mfa_enabled?: boolean | undefined;
	banner?: string | undefined;
	accent_color?: string | undefined;
	locale?: string | undefined;
	verified?: boolean | undefined;
	email?: string | undefined;
	flags?: string | undefined;
	premium_type?: string | undefined;
	public_flags?: string | undefined;
	avatar_decoration_data?: string | undefined;
	constructor(client: Client, data: BaseUserStructure){
		super(client)
		this.id = data.id;
		this.username = data.username;
		this.descriminator = data.descriminator;
		this.global_name = data.global_name;
		this.avatar = data.avatar;
	}
}
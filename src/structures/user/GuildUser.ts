import type { Client } from "../../mod.ts";
import { BaseUser } from "./User.ts";

/**
 * ユーザーのうち、ギルド用のユーザーに絞ったものです。
 */
export class GuildUser extends BaseUser{
	/**
	 * Baseベースなのでclientが必要です。
	 * @param client 
	 */
	constructor(client: Client){
		super(client)
	}
}
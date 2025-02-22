import type { Client } from "../../mod.ts";
import { User } from "./User.ts";

/**
 * ユーザーのうち、ギルド用のユーザーに絞ったものです。
 */
export class GuildUser extends User{
	/**
	 * Baseベースなのでclientが必要です。
	 * @param client 
	 */
	constructor(client: Client,data: any){
		super(client,data)
	}
}
import { GuildChannel, Message } from "../structures/mod.ts";

export interface ClientEvents {
	CHANNEL_EDIT?: GuildChannel;
	MESSAGE_CREATE?: Message;
}
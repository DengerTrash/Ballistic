import { GuildChannel, Message } from "../structures/mod.ts";

export interface gatewayEventHandlerTypes {
	[key:string]: {
		requirement: (any)[],
		returnValue: any
	}
}
export const gatewayEventHandler: gatewayEventHandlerTypes = {
	MESSAGE_CREATE: {
		requirement: ["GuildChannel", "Message"],
		returnValue: "Message"
	}
}
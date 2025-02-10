import { GuildChannel, Message } from "../structures/mod.ts";

export interface gatewayEventHandlerTypes {
	[key:string]: {
		requirement: (string)[],
		returnValue: string
	}
}

export interface gatewayEvents {
	MESSAGE_CREATE?: (event: Message) => void
}
export const gatewayEventHandler: gatewayEventHandlerTypes = {
	MESSAGE_CREATE: {
		requirement: ["GuildChannel", "Message"],
		returnValue: "Message"
	}
}
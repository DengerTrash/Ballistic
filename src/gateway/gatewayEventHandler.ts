export interface gatewayEventHandlerTypes {
	[key:string]: {
		requirement: (string)[],
		returnValue: string
	}
}
export const gatewayEventHandler: gatewayEventHandlerTypes = {
	MESSAGE_CREATE: {
		requirement: ["GuildChannel", "Message"],
		returnValue: "Message"
	}
}
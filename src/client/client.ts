import { GatewayManager } from "../gateway/gatewayManager.ts";
import { RESTManager } from "../rest/restManager.ts";
import { gatewayEventHandler } from "../gateway/gatewayEventHandler.ts";
import {
	GuildChannel, Message
} from "../structures/mod.ts";
import Ballister from "../util/event.ts";


export class Client extends Ballister{
	//*@private */
	private token: string | undefined;
	//*@private */
	private gatewayManager: GatewayManager;
	//*@private */
	private restManager: RESTManager;

	get gateway(){
		return this.gatewayManager
	}
	get rest(){
		return this.restManager
	}

	/**
	 * A Discord bot client.
	 * @param token 
	 */
	constructor(token: string){
		super();
		this.token = token;
		if(!this.token){
			throw new Error('Token is undefined or Invalid')
		}
		this.gatewayManager = new GatewayManager(this.token);
		this.restManager = new RESTManager(this.token);
		for(const handle in gatewayEventHandler){
			this.gatewayManager.on(handle, (events) => {
				const instances:{
					[key:string]: any
				} = {};
				const institems = gatewayEventHandler[handle as keyof typeof gatewayEventHandler];
				if(!institems.requirement.includes(institems.returnValue)) throw new Error('GatewayEventHandler has invalid requirement or returnValue')

				if(institems.requirement.includes("GuildChannel")) instances.GuildChannel = new GuildChannel(this, events.channel_id);				
				if(institems.requirement.includes("Message")) instances.Message = new Message(this, instances.GuildChannel, events);

				const returnvalue = instances[institems.returnValue]
				this.emit(handle, returnvalue)
			})
		}
	}
	login(){
		this.gatewayManager.connect();
	}
}
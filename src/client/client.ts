import { GatewayManager } from "../gateway/gatewayManager.ts";
import { RESTManager } from "../rest/restManager.ts";
import { ClientEvents } from "./clientEvent.ts";
import {
	GuildChannel, Message
} from "../structures/mod.ts";
import Ballister from "../util/event.ts";

type EventType<event extends keyof ClientEvents> = ClientEvents[event];
export class Client{
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
		this.token = token;
		if(!this.token){
			throw new Error('Token is undefined or Invalid')
		}
		this.gatewayManager = new GatewayManager(this, this.token);
		this.restManager = new RESTManager(this.token);
	}
	regist<Event extends keyof ClientEvents>(
		eventName: Event,
		listener: (args: EventType<Event>) => void
	){
		this.gatewayManager.on(eventName,listener);
	}
	login(){
		this.gatewayManager.connect();
	}
}
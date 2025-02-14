import { GatewayManager } from "../gateway/gatewayManager.ts";
import { RESTManager } from "../rest/restManager.ts";
import { ClientEvents, CommonEvents } from "./clientEvent.ts";
import {
	GuildChannel, Message
} from "../structures/mod.ts";
import Ballister from "../util/event.ts";

type EventType<event extends keyof ClientEvents> = ClientEvents[event];
interface EventRegisterPayload<Event extends keyof ClientEvents>{
	trigger: Event;
	execute: (event: CommonEvents) => void;
}
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
	add<T extends keyof ClientEvents>(data: EventRegisterPayload<T>){
		const execute = data.execute;
		this.gatewayManager.on(data.trigger,(args) => {
			const common = new CommonEvents(data.trigger, this, args);
			execute(common);
		})
	}
	login(){
		this.gatewayManager.connect();
	}
}
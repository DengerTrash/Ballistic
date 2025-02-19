import { GatewayManager } from "../gateway/gatewayManager.ts";
import { RESTManager } from "../rest/restManager.ts";
import { CommonEvents } from "./CommonEvent.ts";
import { GuildCache, GuildChannelCache } from "../cache/mod.ts";
import type { GatewayEvents } from "../gateway/GatewayEvents.ts";
import { ClientEvents } from "./clientEvent.ts";
import { ClientCommands } from "./ClientCommands.ts";

type EventType<event extends keyof GatewayEvents> = GatewayEvents[event];
export interface EventRegisterPayload<Event extends keyof GatewayEvents>{
	trigger: Event;
	execute: (event: CommonEvents) => void;
}
/**
 * 至極普通のクライアントですが、何か？
 * This is a client.. but what?
 */
export class Client{
	//*@private */
	private token: string | undefined;
	//*@private */
	public gatewayManager: GatewayManager;
	//*@private */
	public restManager: RESTManager;

	readonly clientName: string | undefined;

	
	public channels: GuildChannelCache;
	public guilds: GuildCache;
	
	private intent: (number)[] | undefined;
	private intentValue: number | undefined;
	
	public command: ClientCommands;
	public event: ClientEvents;
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
	constructor(clientName: string, token: string, intent: (number)[]){
		this.token = token;
		this.clientName = clientName;

		if(!this.token){
			throw new Error('Token is undefined or Invalid')
		}
		this.intentValue = 0;
		for(const intentValue of intent){
			this.intentValue += 2 ** intentValue;
			if(intentValue === -1){
				this.intentValue = 3276769;
				console.warn('| WARNING: You are using \'ALL\' intents. Do not use ALL intent in prod!!!')
				break;
			}
		}
		
		this.event = new ClientEvents(this);
		this.command = new ClientCommands(this);
		
		this.channels = new GuildChannelCache(this);
		this.guilds = new GuildCache(this);

		this.gatewayManager = new GatewayManager(this, this.token, this.intentValue);
		this.restManager = new RESTManager(this.token);
	}
	regist<Event extends keyof GatewayEvents>(
		eventName: Event,
		listener: (args: EventType<Event>) => void
	){
		this.gatewayManager.on(eventName,listener);
	}
	oldEvent<T extends keyof GatewayEvents>(data: EventRegisterPayload<T>){
		const trigger = data.trigger;
		const execute = data.execute;
		this.gatewayManager.on(trigger,(args) => {
			const common = new CommonEvents(trigger, this, args);
			execute(common);
		})
	}
	login(){
		this.gatewayManager.connect();
	}
}
import { type GatewayEvents, GatewayManager, RESTManager } from "../endpoints/mod.ts";
import { ClientEvents } from "./ClientEvent.ts";
import { CommonEvents } from "./CommonEvent.ts";
import { GuildCache } from "../structures/guild/mod.ts";
import { GuildChannelCache } from "../structures/mod.ts";
import { ClientCommands } from "./ClientCommands.ts";

/**
 * ChatGPTに聞いて。
 */
type EventType<event extends keyof GatewayEvents> = GatewayEvents[event];

export interface EventRegisterPayload<Event extends keyof GatewayEvents>{
	trigger: Event;
	execute: (event: CommonEvents) => void;
}

export interface ClientOption {
	sendGatewayEvents?: boolean;
}
/**
 * 至極普通のクライアントですが、何か？
 * This is a client.. but what?
 */
export class Client{
	//*@private */
	private token: string | undefined;
	//*@private */
	private gatewayManager: GatewayManager;
	//*@private */
	private restManager: RESTManager;

	readonly clientName: string | undefined;

	public channels: GuildChannelCache;
	public guilds: GuildCache;
	
	private intentValue: number | undefined;
	
	readonly option: ClientOption | undefined;
	/**
	 * コマンド関連の記述はClientCommands.tsに置きました。
	 */
	public command: ClientCommands;
	public event: ClientEvents;

	public appId: string | undefined;
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
	constructor(clientName: string, token: string, intent: (number)[], option?:ClientOption){
		this.token = token;
		this.clientName = clientName;

		if(!this.token){
			throw new Error('Token is undefined or Invalid')
		}

		if(option){
			this.option = option;
		}

		//Intentを計算します。
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
		this.restManager = new RESTManager(this, this.token);
	}
	/**
	 * Login client.
	 */
	login(){
		this.gatewayManager.connect();
	}
}
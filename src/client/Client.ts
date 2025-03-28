import { type GatewayEvents, Events, GatewayManager, RESTManager } from "../endpoints/mod.ts";
import { ClientEvents, InteractionEvent } from "./ClientEvent.ts";
import { Interaction } from "./Interaction.ts";
import { GuildCache } from "../structures/guild/GuildCache.ts";
import { GuildChannelCache } from "../structures/channel/ChannelCache.ts";
import { ClientCommands } from "./ClientCommands.ts";
import { GuildUserCache } from "../structures/user/UserCache.ts";

/**
 * ChatGPTに聞いて。
 */
type EventType<event extends keyof GatewayEvents> = GatewayEvents[event];

export interface EventRegisterPayload<T>{
	trigger: string;
	execute: InteractionEvent<T>;
}

interface regist<T extends keyof GatewayEvents> {
	condition: keyof typeof Events
	execute: InteractionEvent<EventType<T>>
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
	private gatewayManager: GatewayManager;
	private restManager: RESTManager;
	private intentValue: number | undefined;
	public clientId: string | undefined;

	readonly clientName: string | undefined;
	readonly option: ClientOption | undefined;

	public channels: GuildChannelCache;
	public guilds: GuildCache;
	public guildUsers: GuildUserCache;
	
	public registedEvents = Map<string, any>
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

		if(!this.token) throw new Error('Token is undefined or Invalid')

		if(option){
			this.option = option;
		}

		//Intentを計算します。
		this.intentValue = 0;
		for(const intentValue of intent){
			this.intentValue += 2 ** intentValue;
			if(intentValue === -1){
				this.intentValue = 3276769;
				console.warn('| WARNING: You are using \'ALL\' intents. Do not use ALL intent for prod!!!')
				break;
			}
		}
		
		this.event = new ClientEvents(this);
		this.command = new ClientCommands(this);
		
		this.channels = new GuildChannelCache(this);
		this.guilds = new GuildCache(this);
		this.guildUsers = new GuildUserCache(this);
		this.gatewayManager = new GatewayManager(this, this.token, this.intentValue);
		this.restManager = new RESTManager(this, this.token);

	
	}
	on(event: keyof GatewayEvents, execute: InteractionEvent<EventType<typeof event>>){
		type T = EventType<typeof event>
		this.gatewayManager.on(event, async(d)=>{
			const ce = new Interaction<T>(event, this, d);
			await execute(ce)
		})
	}
	regist<T extends keyof GatewayEvents>(data: regist<T>){
		this.gatewayManager.on(data.condition as string, async(d)=> {
			const ce = new Interaction<T>(data.condition as string, this, d);
			await data.execute(ce)
		})
	}
	/*
	recieve<T extends keyof GatewayEvents>(execute: (event: Interaction<T>) => Promise<void> | void){
		this.gatewayManager.on(, async(d)=> {
			const ce = new Interaction<T>(data.condition as string, this, d);
			await execute(ce)
		})
	}
		*/
	/**
	 * Login client.
	 */
	async login(){
		const dat = await this.rest.getAboutMe()
		this.clientId = dat.id;
		this.gatewayManager.connect();
	}
}
import { GatewayManager } from "../gateway/gatewayManager.ts";
import { RESTManager } from "../rest/restManager.ts";
import {
	GuildChannel,Message
} from "../structures/mod.ts";
import Ballister from "../util/event.ts";


export class Client extends Ballister{
	private token: string | undefined;
	private gatewayManager: GatewayManager;
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

		this.gatewayManager.on('MESSAGE_CREATE', (event) => {
			const chac = new GuildChannel(this, event.channel_id);
			const meme = new Message(this, chac, event);
			this.emit('MESSAGE_CREATE',meme)
		})
	}
	login(){
		this.gatewayManager.connect();
	}
}
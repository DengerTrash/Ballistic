import { GatewayManager } from "../gateway/gatewayManager.ts";
import { Intents } from "../intents/intents.ts";
import { RESTManager } from "../rest/restManager.ts";
import { type GatewayEvents, CommonEvents } from "./clientEvent.ts";

type EventType<event extends keyof GatewayEvents> = GatewayEvents[event];
interface EventRegisterPayload<Event extends keyof GatewayEvents>{
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

	private intent: (number)[] | undefined;
	private intentValue: number | undefined;
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
	constructor(token: string, intent: (number)[]){
		this.token = token;
		if(!this.token){
			throw new Error('Token is undefined or Invalid')
		}
		this.intentValue = 0;
		for(const intentValue of intent){
			this.intentValue += 2 ** intentValue;
			if(intentValue === -1){
				this.intentValue = 3276769;
				break;
			}
		}
		console.log(this.intentValue)

		this.gatewayManager = new GatewayManager(this, this.token, this.intentValue);
		this.restManager = new RESTManager(this.token);
	}
	regist<Event extends keyof GatewayEvents>(
		eventName: Event,
		listener: (args: EventType<Event>) => void
	){
		this.gatewayManager.on(eventName,listener);
	}
	events<T extends keyof GatewayEvents>(data: EventRegisterPayload<T>){
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
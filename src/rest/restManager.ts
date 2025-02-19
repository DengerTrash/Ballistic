import { MessagePayload } from "../structures/mod.ts";
import Ballister from "../util/event.ts";

export class RESTManager extends Ballister{
	private token: string | undefined;
	public baseURL: string = 'https://discord.com/api';
	public api_version: number = 10
	public url: string
	public appData : any;
	constructor(token: string){
		super();
		this.token = token
		this.url = `${this.baseURL}/v${this.api_version}`
		this.appData = this.getThisApp()
	}
	temp(url: string, method: string, args?: any): any{
		const link: string = `${this.url}/${url}`

		interface reqPayload {
			method: string,
			headers: any,
			body?: any
		}
		const req: reqPayload = {
			method: method,
			headers:{
				Authorization: "Bot " + this.token,
				"Content-Type": 'application/json',
				'User-Agent': 'DiscordBot (BallisticDev 1)'
			}
		}
		if(method != 'GET') req.body = JSON.stringify(args ?? {})
		const fet = fetch(link, req)
		fet.then(async(res) => {
			console.log(await res.json())
			if(!res.ok){
				throw new Error()
			}
			if(method === 'GET'){
				const caught = await res.json()
				return caught;
			}
			return true
		}).catch(e => {
			console.error(`| REST API ERROR: ${e}`)
			return false
		})
	}
	/**
	 * /channels/[channel Id]/messagesへポストする場合に使用します。
	 * 成功した場合はtrueを返します。
	 * @param channel 
	 * @param args 
	 * @returns true | false
	 */
	sendMessage(channel: string, args: MessagePayload): boolean{
		const doit = this.temp(`channels/${channel}/messages`, 'POST', args);
		return doit;
	}
	createMessageReaction(channel: string, message: string, emoji:string){
		const doit = this.temp(`channels/${channel}/messages/${message}/reactions/${emoji}/@me`, 'PUT')
		return doit;
	}
	getThisApp(){
		const doit = this.temp(`applications/@me`, 'GET')
		return doit
	}
}
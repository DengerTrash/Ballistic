import { MessagePayload } from "../structures/mod.ts";
import Ballister from "../util/event.ts";

export class RESTManager extends Ballister{
	private token: string | undefined;
	public baseURL: string = 'https://discord.com/api';
	public api_version: number = 10
	public url: string
	constructor(token: string){
		super();
		this.token = token
		this.url = `${this.baseURL}/v${this.api_version}`
	}
	temp(url: string, method: string, args?: any){
		const link: string = `${this.url}/${url}`;
		fetch(link, {
			method: method,
			headers:{
				Authorization: "Bot " + this.token,
				"Content-Type": 'application/json',
				'User-Agent': 'DiscordBot (BallisticDev 1)'
			},
			body: JSON.stringify(args)
		}).then(async(res) => {
			if(!res.ok){
				console.error('| REST API ERROR!')
				const caught = await res.json()
				console.log(`|\'${caught.message}\'`)
			}
			if(method == 'GET'){
				return res;
			}
			return true
		}).catch(e => {
			console.error(`REST API ERROR: ${e}`)
			return false
		})
		return false
	}
	/**
	 * /channels/[channel Id]/messagesへポストする場合に使用します。
	 * 成功した場合はtrueを返します。
	 * @param channel 
	 * @param args 
	 * @returns true | false
	 */
	sendMessage(channel: string, args: MessagePayload): boolean{
		const doit = this.temp(`/channels/${channel}/messages`, 'POST', args);
		return doit;
	}
	createMessageReaction(channel: string, message: string, emoji:string){
		const doit = this.temp(`/channels/${channel}/messages/${message}/reactions/${emoji}/@me`, 'PUT')
		return doit;
	}
}
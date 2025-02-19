import { MessagePayload } from "../structures/mod.ts";
import Ballister from "../util/event.ts";
interface reqPayload {
	method: string,
	headers: any,
	body?: any
}
export class RESTManager extends Ballister{
	private token: string | undefined;
	public baseURL: string = 'https://discord.com/api';
	public api_version: number = 10
	public url: string
	public appId: any;
	constructor(token: string){
		super();
		this.token = token
		this.url = `${this.baseURL}/v${this.api_version}`
		this.appId = this.getThisApp()
	}
	async getAppId(){
		const dat = await this.getThisApp()
		const res = await dat.json()
		return res.id;
	}
	temp(url: string, method: string, args?: any): any{
		const link: string = `${this.url}/${url}`

		const req: reqPayload = {
			method: method,
			headers:{
				Authorization: "Bot " + this.token,
				"Content-Type": 'application/json',
				'User-Agent': 'DiscordBot (BallisticDev 1)'
			}
		}
		if(method != 'GET') req.body = JSON.stringify(args ?? {})
		fetch(link, req).then(async(res) => {
			console.log('THEN')
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
	async getTemp(url: string){
		const link: string = `${this.url}/${url}`
		const req:reqPayload = {
			method: 'GET',
			headers:{
				Authorization: "Bot " + this.token,
				"Content-Type": 'application/json',
				'User-Agent': 'DiscordBot (BallisticDev 1)'
			}
		}
		const resp = await fetch(link, req)
		if(!resp.ok) console.error(`|RESTAPI ERROR: ${resp}`)
		const resJson = await resp.json()
		return resJson
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
	async getThisApp(){
		const doit = await this.getTemp(`applications/@me`)
		this.appId = doit.id;
		return doit.id
	}
	async GetSlashCommand(){
		const doit = await this.getTemp(`applications/${this.appId}/commmands`)
		return doit;
	}
}
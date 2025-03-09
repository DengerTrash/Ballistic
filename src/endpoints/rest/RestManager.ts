import { Client } from "../../mod.ts";
import { CommandPayload, CommandStructure } from "../../structures/command/Command.ts";
import { BaseChannelStructure, Message, MessagePayload } from "../../structures/mod.ts";
import Ballister from "../../util/event.ts";
import { MessageRESTManager } from "./RestMessage.ts";
interface reqPayload {
	method: string,
	headers: any,
	body?: any
}
export class RESTManager extends Ballister{
	private token: string | undefined;
	private baseURL: string = 'https://discord.com/api';
	public api_version: number = 10
	public url: string
	public appId: string | undefined;

	public message: MessageRESTManager
	client: Client;
	
	constructor(client: Client, token: string){
		super();
		this.client = client;
		this.message = new MessageRESTManager(this)
		this.token = token
		this.url = `${this.baseURL}/v${this.api_version}`
		this.detectId()
	}
	async detectId(){
		if(!this.appId){
			const res = await fetch(`${this.url}/applications/@me`,{
				headers:{
					Authorization: "Bot "+ this.token,
					"Content-Type": 'application/json',
					'User-Agent': 'DiscordBot (BallisticDev 1)'
				}
			})
			const jj = await res.json()
			this.appId = jj.id;
		}
	}
	async temp(url: string, method: string, args?: any): Promise<any>{
		await this.detectId();

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
			if(!res.ok){
				const er = await res.json()
				console.dir(er.errors)
				throw new Error(er.message)
			}
			if(method === 'GET'){
				const caught = await res.json()
				return caught;
			}
			return true
		}).catch(e => {
			console.error(`| REST API ERROR: ${e}`)
		})
	}
	async get(url: string){
		this.detectId()
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
		const resJson = await resp.json()
		if(!resp.ok){
			if(resJson.code != 0) console.error(`| REST API ERROR: ${resJson}`);
		}
		return resJson
	}
	async registSlashCommand(data: CommandStructure){
		await this.detectId();
		try{
			const dat:CommandStructure = data
			const doit = await this.temp(`applications/${this.appId}/commands`,'POST',dat)
			console.log(`| Registing Slash command "${data.name}".`);
			return doit;
		}catch(e){
			console.error(`|Regist Command ERROR: ${e}`)
		}
	}
	async registGuildSlashCommand(data: CommandStructure, guild: string){
		await this.detectId();
		try{
			const dat:CommandStructure = data
			const doit = await this.temp(`applications/${this.appId}/guilds/${guild}/commands`,'POST',dat);
			console.log(`| Registing Guild Slash command "${data.name}".`);
			return doit;
		}catch(e){
			console.error(`|Regist Command ERROR: ${e}`)
		}
	}
	async InteractionFollowUp(type: number, id:string, token: string, massage: MessagePayload){
		await this.detectId()
		const payload = {
			type: 4,
			data: {}
		}
		payload.type = type;
		payload.data = massage
		const doit = await this.temp(`interactions/${id}/${token}/callback`, "POST", payload)
		return doit
	}
	async createMessageReaction(channel: string, message: string, emoji:string){
		const doit = await this.temp(`channels/${channel}/messages/${message}/reactions/${emoji}/@me`, 'PUT')
		return doit;
	}
	async GetSlashCommand(){
		const doit = await this.get(`applications/${this.appId}/commmands`)
		return doit;
	}
	async GetChannel(channelId: string): Promise<BaseChannelStructure>{
		const doit = await this.get(`/channels/${channelId}`);
		return doit as BaseChannelStructure;
	}
}
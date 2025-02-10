import { MessageContent } from "../structures/Message.ts";
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
	postMassage(channel: string, args: MessageContent): boolean{
		const link: string = `${this.url}/channels/${channel}/messages`;
		fetch(link, {
			method: 'POST',
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
			return true
		}).catch(e => {
			console.error(`REST API ERROR: ${e}`)
			return false
		})
		return false
	}
}
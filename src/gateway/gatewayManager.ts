//Thanks harmony!
import type { Client } from "../client/client.ts"
import Ballister from "../util/event.ts"

export interface WebSocketResponse {
	op: number,
	d: any,
	s?: number,
	t?: string
}

export class GatewayManager extends Ballister{
	private token: string | undefined
	private websocket: WebSocket | undefined
	private sequence_number: number | null = null
	private isHeartbeatSend: boolean = false
	private readyStatus: boolean = false
	private resume_gateway_url: string | undefined
	private session_id: string | undefined
	public client!: Client
	public api_version: number = 10
	public heartbeat_interval: number | null = null
	public bot_name: string | undefined;

	constructor(token: string | undefined){
		super()
		this.token = token
	}
	public connect(){
		this.initWebSocket()
	}
	protected initWebSocket() {
		this.websocket = new WebSocket(`wss://gateway.discord.gg/?v=${this.api_version}&enchoding=json`)
		this.websocket.onopen = this.onopen.bind(this)
		this.websocket.onmessage = this.onmessage.bind(this)
	}
	protected sendId(){
		this.send({
			'op': 2,
			'd': {
				'token': this.token,
				'intents': 3276799,
				'properties': {
					os: 'windows',
					browser: 'BallisticDev',
					device: 'BallisticDev'
				}
			}
		})
	}
	protected onopen(){
		console.log('| on open')
		
	}
	protected onmessage(event: MessageEvent){
		const { op, d, s, t } : WebSocketResponse = JSON.parse(event.data)
		switch(op){
			case 0: {
				if(t == 'READY'){
					this.bot_name = d.user.username ?? this.bot_name
					console.log(`| ${this.bot_name} is READY!`)
				}
				else{
					console.log(`op: ${op}\n`, `s: ${s}\n`, `t: ${t}`)
					console.dir(d)
				}
				this.readyStatus = true
				this.emit(t!,d);

				break
			}
			case 9: {
				throw new Error('Invalid session')
			}
			case 10: {
				this.sendId()
				this.heartbeat_interval = d.heartbeat_interval
				this.sequence_number = s ?? null
				console.log('| HELLO, Ballistic!')
				console.log(`| heartbeat_interval is ${this.heartbeat_interval}.`)
				setInterval(this.heartbeat.bind(this), this.heartbeat_interval!)

				break
			}
			case 11: {
				this.isHeartbeatSend = true
				console.log('| heartbeat ok')
				break
			}
			default: {
				console.log(`op: ${op}\n`,`d: ${JSON.stringify(d)}\n`, `s: ${s}\n`, `t: ${t}`)
			}
		}
	}
	send(data: WebSocketResponse){
		const payload = JSON.stringify({
			op: data.op,
			d: data.d,
			s: data.s,
			t: data.t
		})
		this.websocket?.send(payload)
		return true;
	}
	protected heartbeat(){
		if(!this.readyStatus) return;
		const payload = {
			op: 1,
			d: this.sequence_number ?? null
		}
		this.send(payload)
	}
}
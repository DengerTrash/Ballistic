import { EventEmitter } from "node:events";

export default class Ballister extends EventEmitter{
	public onEvents = Map<string | symbol, any>
	constructor(){
		super()
	}
}
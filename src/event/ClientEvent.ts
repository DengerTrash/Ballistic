import { CommonEvents } from "./mod.ts";
import type { GatewayEvents } from "../endpoints/mod.ts"
import type { Client, EventRegisterPayload } from "../mod.ts";

export class ClientEvents {
    private client: Client;
    constructor(client: Client){
        this.client = client;
    }
    events<T extends keyof GatewayEvents>(data: EventRegisterPayload<T>){
        const trigger = data.trigger;
        const execute = data.execute;
        this.client.gateway.on(trigger,(args) => {
            CommonEvents.restore(trigger, this.client, args).then(ce =>{
                const cee = new CommonEvents(ce)
                execute(cee);
            });
        })
    }
    message_create(execute: (event: CommonEvents) => void){
        this.events({trigger:'MESSAGE_CREATE',execute:execute})
    }
}
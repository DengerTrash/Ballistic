import { CommonEvents } from "./CommonEvent.ts";
import type { GatewayEvents } from "../endpoints/mod.ts"
import type { Client, EventRegisterPayload } from "../mod.ts";
import { Message } from "../structures/mod.ts";

export class ClientEvents {
    private client: Client;
    constructor(client: Client){
        this.client = client;
    }
    private events<T extends keyof GatewayEvents>(data: EventRegisterPayload<T>){
        const trigger = data.trigger;
        const execute = data.execute;
        this.client.gateway.on(trigger,(args) => {
            const ce = new CommonEvents(trigger, this.client, args);
            execute(ce);
        })
    }
    message_create(execute: (event: CommonEvents) => void){
        this.events({trigger:'MESSAGE_CREATE',execute:execute})
    }
    message_delete(execute: (event: CommonEvents) => void){
        this.events({trigger:'MESSAGE_DELETE',execute:execute})
    }
}
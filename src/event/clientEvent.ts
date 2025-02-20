import { CommonEvents } from "./CommonEvent.ts";
import { GatewayEvents } from "../gateway/GatewayEvents.ts"
import { Client, EventRegisterPayload } from "../mod.ts";

export class ClientEvents {
    private client: Client;
    constructor(client: Client){
        this.client = client;
    }
    events<T extends keyof GatewayEvents>(data: EventRegisterPayload<T>){
        const trigger = data.trigger;
        const execute = data.execute;
        this.client.gatewayManager.on(trigger,(args) => {
            const common = new CommonEvents(trigger, this.client, args);
            execute(common);
        })
    }
    message_create(execute: (event: CommonEvents) => void){
        this.events({trigger:'MESSAGE_CREATE',execute:execute})
    }
}
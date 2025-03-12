import { CommonEvents } from "../structures/command/CommonEvent.ts";
import type { GatewayEvents } from "../endpoints/mod.ts"
import type { Client, EventRegisterPayload } from "./Client.ts";

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
    channel_create(execute: (event: CommonEvents) => void){
        this.events({trigger:'CHANNEL_CREATE',execute:execute})
    }
    channel_edit(execute: (event: CommonEvents) => void){
        this.events({trigger:'CHANNEL_EDIT',execute:execute})
    }
    channel_delete(execute: (event: CommonEvents) => void){
        this.events({trigger:'CHANNEL_DELETE',execute:execute})
    }

    message_create(execute: (event: CommonEvents) => void){
        this.events({trigger:'MESSAGE_CREATE',execute:execute})
    }
    message_delete(execute: (event: CommonEvents) => void){
        this.events({trigger:'MESSAGE_DELETE',execute:execute})
    }
    guild_member_update(execute: (event: CommonEvents) => void){
        this.events({trigger:'GUILD_MEMBER_UPDATE',execute:execute})
    }
}
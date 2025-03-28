import { Interaction } from "./Interaction.ts";
import type { GatewayEvents } from "../endpoints/mod.ts"
import type { Client, EventRegisterPayload } from "./Client.ts";
import { Channel } from "../structures/channel/Channel.ts";
import { Message } from "../structures/mod.ts";

export type InteractionEvent<T> = (event: Interaction<T>) => Promise<void> | void
//export type CustomInteraction = (event: keyof GatewayEvents,(event: Interaction<>) => Promise<void> | void)
export class ClientEvents {
    private client: Client;
    constructor(client: Client){
        this.client = client;
    }
    private events<T>(data: EventRegisterPayload<T>){
        const trigger = data.trigger;
        const execute = data.execute;
        this.client.gateway.on(trigger,(args) => {
            const ce = new Interaction<T>(trigger, this.client, args);
            execute(ce);
        })
    }
    message_create(execute: InteractionEvent<Message>){
        this.events<Message>({trigger:'MESSAGE_CREATE',execute:execute})
    }
}
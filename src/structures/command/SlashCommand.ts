import { CommonEvents } from "../../client/CommonEvent.ts";
import { Command, type CommandPayload } from "./Command.ts";
import type { MessagePayload } from "../mod.ts";
import type { Client } from "../../mod.ts";

export class SlashCommand extends Command {
    constructor(client: Client, data: CommandPayload){
        const datt: CommandPayload = data;
        super(client, datt)
    }
}
export class SlashCommandEvents extends CommonEvents {
    readonly event_name: string;
    private token: string;
    private id: string;
    constructor(event: string, client: Client, data:any){
        super('INTERACTION_CREATE', client, data);
        this.event_name = event;
        this.token = data.token;
        this.id = data.id
    }
    followUp(message: MessagePayload){
        this.client.rest.InteractionFollowUp(4, this.id, this.token, message)
    }
}
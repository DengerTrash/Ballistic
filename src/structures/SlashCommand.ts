import { Client, CommonEvents } from "../mod.ts";
import { BaseCommand, CommandPayload, CommandStructure} from "./BaseCommand.ts";
import { MessagePayload } from "./mod.ts";

export class SlashCommand extends BaseCommand {
    constructor(client: Client, data: CommandPayload){
        const datt: CommandPayload = data;
        super(client, datt)
    }
}
export class SlashCommandEvents extends CommonEvents {
    private token: string;
    private id: string;
    constructor(event: string, client: Client, data: any){
        super(event, client, data);
        this.token = data.token;
        this.id = data.id
    }
    followUp(message: MessagePayload){
        this.client.restManager.InteractionFollowUp(4, this.id, this.token, message)
    }
}
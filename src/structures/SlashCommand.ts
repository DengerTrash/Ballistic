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
    constructor(event: string, client: Client, data: any){
        super(event, client, data);
    }
    followup(message: MessagePayload){
    }
}
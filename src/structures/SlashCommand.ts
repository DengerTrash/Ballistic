import { Client } from "../mod.ts";
import { BaseCommand, CommandPayload, CommandStructure} from "./BaseCommand.ts";

export class SlashCommand extends BaseCommand {
    constructor(client: Client, data: CommandPayload){
        const datt: CommandPayload = data;
        super(client, datt)
    }
}
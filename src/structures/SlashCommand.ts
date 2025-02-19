import { Client } from "../mod.ts";
import { BaseCommand, CommandPayload, CommandStructure} from "./BaseCommand.ts";

export class SlashCommand extends BaseCommand {
    constructor(client: Client, data: CommandPayload){
        const dat: any = data;
        dat.type = 1;
        const datt: CommandStructure = dat;
        super(client, datt)
    }
}
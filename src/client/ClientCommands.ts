import { Client, CommonEvents } from "../mod.ts";
import { CommandPayload, CommandStructure } from "../structures/BaseCommand.ts";

export class ClientCommands {
    public client: Client;
    constructor(client: Client){
        this.client = client
    }
    async slash(data: CommandPayload){
        await this.client.restManager.registSlashCommand(data);
        this.client.gatewayManager.on('INTERACTION_CREATE',(event) => {
            //if(event.application_id != this.client.restManager.appId) return;
            if(event.data.type != 1) return;
            if(event.data.name != data.name) return;
            const ce = new CommonEvents('INTERACTION_CREATE', this.client, event)
            data.execute(ce)
        })
    }
}
import { Client } from "../mod.ts";
import { CommandPayload } from "../structures/BaseCommand.ts";

export class ClientCommands {
    public client: Client;
    constructor(client: Client){
        this.client = client
    }
    slash(data: CommandPayload){
        this.client.restManager
        this.client.gatewayManager.on('INTERACTION_CREATE',(event) =>{
            if(event)
            data.execute
        })
    }
}
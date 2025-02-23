import { Client } from "../mod.ts";
import { CommandPayload } from "../structures/command/Command.ts";
import { SlashCommandEvents } from "../structures/command/SlashCommand.ts";

/**
 * クライアントにコマンドを登録するためのサブクラスです。
 */
export class ClientCommands {
    public client: Client;
    /**
     * クライアントのサブクラスですもの。そりゃいるよね。
     * @param client 
     */
    constructor(client: Client){
        this.client = client
    }

    /**
     * スラッシュコマンドを登録します。
     * @param data 
     */
    async slash(data: CommandPayload){
        await this.client.rest.registSlashCommand(data);
        this.client.gateway.on('INTERACTION_CREATE',(event) => {
            if(event.application_id != this.client.rest.appId) return;
            if(event.data.type != 1) return;
            if(event.data.name != data.name) return;
            SlashCommandEvents.restore('INTERACTION_CREATE', this.client, event).then(ce => {
                data.execute(ce)
            })
        })
    }
}
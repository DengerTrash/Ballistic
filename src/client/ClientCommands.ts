import { Client } from "../mod.ts";
import { CommandPayload } from "../structures/command/Command.ts";
import { commandDataConverter } from "../structures/command/mod.ts";
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
        const conv = commandDataConverter(data);
        if(data.onlyGuild){
            for(const guilda of data.onlyGuild){
                await this.client.rest.registGuildSlashCommand(conv, guilda);
            }
        }
        else{
            await this.client.rest.registSlashCommand(conv);
        }
        this.client.gateway.on('INTERACTION_CREATE',(event) => {

            if(event.application_id != this.client.rest.appId) return;
            if(event.data.type != 1) return;
            if(event.data.name != data.name) return;


            const cce = new SlashCommandEvents(data.name,this.client, event)
            data.execute(cce)
        })
    }
}
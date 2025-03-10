import { ChannelPayload } from "../../structures/channel/Channel.ts";
import { RESTManager } from "../mod.ts";

export class GuildRESTManager {
    rest: RESTManager
    constructor(rest: RESTManager){
        this.rest = rest
    }

    /**
     * /channels/[channel Id]/messagesへポストする場合に使用します。
     * 成功した場合はtrueを返します。
     * @param channel 
     * @param args 
     * @returns true | false
     */
    async createChannel(guild: string, args: ChannelPayload): Promise<boolean>{
        const doit = await this.rest.temp(`guilds/${guild}/channels`, 'POST', args);
        return doit;
    }
}
import { MessagePayload } from "../../structures/mod.ts";
import { RESTManager } from "../mod.ts";

export class MessageRESTManager {
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
    async send(channel: string, args: MessagePayload): Promise<boolean>{
        const doit = await this.rest.temp(`channels/${channel}/messages`, 'POST', args);
        return doit;
    }
}
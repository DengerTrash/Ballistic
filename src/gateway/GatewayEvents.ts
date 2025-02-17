import { Message } from "../structures/Message.ts";
import { GuildChannel } from "../structures/mod.ts";

export interface GatewayEvents {
  CHANNEL_EDIT?: GuildChannel;
  MESSAGE_CREATE?: Message;
}


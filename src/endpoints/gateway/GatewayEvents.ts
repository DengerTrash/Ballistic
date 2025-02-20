import { GuildUser } from "../structures/GuildUser.ts";
import { Message } from "../structures/Message.ts";
import { GuildChannel } from "../structures/mod.ts";

export interface GatewayEvents {
  CHANNEL_EDIT?: GuildChannel;
  GUILD_MEMBER_ADD?: GuildUser
  MESSAGE_CREATE?: Message;
}


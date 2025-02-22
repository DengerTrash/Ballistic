import {
  GuildChannel,
  GuildUser,
  Message
} from "../../structures/mod.ts";

export interface GatewayEvents {
  CHANNEL_EDIT?: GuildChannel;
  GUILD_MEMBER_ADD?: GuildUser;
  GUILD_MEMBER_REMOVE?: GuildUser;
  MESSAGE_CREATE?: Message;
}


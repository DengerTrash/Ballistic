import {
  GuildChannel,
  GuildUser,
  Message
} from "../../structures/mod.ts";

export interface GatewayEvents {
  APPLICATION_COMMAND_PERMISSIONS_UPDATE?: any;
  CHANNEL_CREATE?: GuildChannel;
  CHANNEL_EDIT?: GuildChannel;
  CHANNEL_DELETE?: GuildChannel;
  GUILD_MEMBER_ADD?: GuildUser;
  GUILD_MEMBER_REMOVE?: GuildUser;
  MESSAGE_CREATE?: Message;
  MESSAGE_DELETE?: Message;
}


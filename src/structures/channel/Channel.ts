import type { Client } from "../../mod.ts";
import { Base } from "../base/mod.ts";


export interface BaseChannelStructure {
	id: any
	type: number
	guild_id?: string
	position?: number
	permission_overwrites?: any
	name?: string
	topic?: string
	nsfw?: boolean
	last_message_id?: string,
	bitrate?: number,
	user_limit?: number,
	rate_limit_per_user?: number,
	recipients?: any
	icon?: string
	owner_id?: string
	application_id?: string
	managed?: boolean
	parent_id?: string
	last_pin_timestamp?: any
	rtc_region?: string
	video_quality_mode?: number
	message_count?: number
	member_count?: number
	thread_metadata?: any
	member?: any
	default_auto_archive_duration?: number
	permissions?: string
	flags?: number
	total_message_sent: number
	available_tags?: any
	applied_tags?: any
	default_Reaction_emoji?: any
	default_sort_order?: number
	default_forum_layout?: number
}

/**
 * チャンネルのベースです。現状では特別なことはありません。
 */
export abstract class Channel extends Base{
	readonly channel_id: string;
	data: BaseChannelStructure | undefined
	constructor(client: Client, channel_id: string, data: BaseChannelStructure){
		super(client)
		this.channel_id = channel_id
		this.data = data
	}
	
}
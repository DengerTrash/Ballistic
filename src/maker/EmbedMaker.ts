export interface Embed {
	title?: string,
	type?: string,
	description?: string,
	url?: string,
	timestamp?: any,
	color?: number,
	footer?: EmbedFooter
}
export interface EmbedFooter {
	text: string,
	icon_url?: string,
	proxy_icon_url?: string
}

export class EmbedMaker {
	public structure: Embed;
	constructor(options: Embed){
		this.structure = options;
	}
}

export function EmbedConverter(embed: EmbedMaker){
	return embed.structure as Embed;
}
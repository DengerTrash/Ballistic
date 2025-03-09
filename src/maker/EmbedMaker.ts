export interface EmbedStructure {
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
	public structure: EmbedStructure;
	constructor(options: EmbedStructure){
		this.structure = options;
	}
}

export function EmbedConverter(embed: EmbedMaker){
	return embed.structure as EmbedStructure;
}
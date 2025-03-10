import * as Ballistic from './mod.ts';
import { CommonEvents } from "./src/structures/command/CommonEvent.ts";
const intents = Ballistic.Intents
const client = new Ballistic.Client(
	'Ballistic_dev',
	Deno.env.get('TOKEN')!,
	[
		intents.all
	]
);

client.event.message_create(async(event: CommonEvents) => {
	const { message } = event;
	if(message?.content != 'hello!') return
	console.log(message?.channel)
	await message?.reply('なんだお前')
})
const embed:Ballistic.EmbedStructure = {
	title: 'title',
	description: 'description'
}
const ping: Ballistic.CommandPayload = ({
	name: 'ping',
	description: 'P I G',
	onlyGuild: [
		'1324304164175614003'
	],
	options: {
		string_option: [
			{
				name: 'sttt',
				description: 'description'
			}
		]
	},
	execute: async(event) => {
		await event.followUp({
			content: '',
			embeds: [embed]
		})
	}
})
client.command.slash(ping)

client.login();
import * as Ballistic from './src/mod.ts';
const intents = Ballistic.Intents
const client = new Ballistic.Client(
	'Ballistic_dev',
	Deno.env.get('TOKEN')!,
	[
		intents.all
	]
);

client.event.message_create(async(event) => {
	const { message } = event;
	if(message?.content != 'hello!') return
	console.log(message?.channel)
	await message?.reply('なんだお前')
	//const vc = event.channel?.voice
	//vc?.joinVoiceChannel(true, true);
})

/*
client.command.slash({
	name: 'ping',
	description: 'P I G',
	execute: async(event) => {
		await event.followUp({
			content: 'fuck'
		})
	}
})
*/
client.login();
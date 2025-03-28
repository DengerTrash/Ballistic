import * as Ballistic from '../mod.ts'
import { Events, Interaction, MessageInteraction } from "../mod.ts";
import { Message } from "../src/structures/mod.ts";

const bot = new Ballistic.Client('Ballistic-Debug',Deno.env.get('TOKEN')!,[
	Ballistic.Intents.all
],{sendGatewayEvents: true})

//DiscordJS風記法
bot.on('MESSAGE_CREATE',async(event: MessageInteraction) => {
	console.log(event)
	if(event.message?.content !== 'この顔になるまで死ねない') return
	await event.message.reply({
		content: '永遠の命を手に入れましたね！'
	})
})

//Discordeno風記法
bot.event.message_create(async(event: Interaction<Message>) => {
	if(event.message?.content !== '強盗です') return
	await event.message.reply('僕、アルバイトォォォォ！')
})

//discall風記法
bot.regist({
	condition: Events.message_create,
	execute: (async(event: MessageInteraction) => {
		if(event.message?.content !== 'まだ助かる') return
		await event.message?.reply('# マダガスカル‼️\n# そ〜れ‼️')
	})
})


bot.login()
import * as Ballistic from '../mod.ts'
import { Events, Interaction, MessageInteraction } from "../mod.ts";
import { Message } from "../src/structures/mod.ts";

const bot = new Ballistic.Client('Ballistic-Debug',Deno.env.get('TOKEN')!,[
	Ballistic.Intents.all
],{sendGatewayEvents: true})

//DiscordJS風記法
bot.on('MESSAGE_CREATE',async(event: MessageInteraction) => {
	if(event.message?.content !== 'この顔になるまで死ねない') return
	await event.message.reply({
		content: '永遠の命を手に入れましたね！'
	})
	await event.guild
})

//Discordeno風記法
bot.event.message_create(async(msg: MessageInteraction) => {
	console.log(msg.channel)
	if(!msg.channel?.isVoice()) return;
	if(msg.message?.content !== 'fuck') return;
	console.log('fuck')
	await msg.channel.voice?.join()
})

bot.event.message_create(async(msg: MessageInteraction) => {
	if(msg.message?.content !== '強盗です') return
	await msg.message?.reply('僕、アルバイトォォォォ！')
});


//discall風記法
bot.regist({
	condition: Events.message_create,
	execute: (async(event: MessageInteraction) => {
		if(event.message?.content !== 'まだ助かる') return
		await event.message?.reply('# マダガスカル‼️\n# そ〜れ‼️')
	})
})

//Ballistic記法
/*
bot.recieve(async(event: Interaction<'MESSAGE_CREATE'>)=> {
	if(event.message?.content !== 'チャーハンの作り方教えて')return;
	await event.message.reply('まず田んぼを用意します')
})
	*/
bot.login()
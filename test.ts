import * as Ballistic from './src/mod.ts';
const client = new Ballistic.Client(Deno.env.get('TOKEN')!);

client.add({
	trigger: 'MESSAGE_CREATE',
	execute: (event) => {
		const { message } = event;
		if(message?.content != 'hello!') return
		console.log(message?.channel)
		message?.reply('なんだお前')
	}
})

client.login();
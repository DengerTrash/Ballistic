import { Client } from './src/mod.ts';
const client = new Client(Deno.env.get('TOKEN')!);

client.regist('MESSAGE_CREATE', message => {
	if(message?.content != 'hello!') return
	console.log(message?.channel)
	message?.channel.send('なんだお前')
})

client.login();
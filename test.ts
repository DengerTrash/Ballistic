import * as ballistic from './src/mod.ts';
const client = new ballistic.Client(Deno.env.get('TOKEN')!);

client.on('MESSAGE_CREATE', (events)=> {
	console.log('hello!');
	if(events.content === "hello!"){
		events.channel.send('なんだお前')
	}
})

client.login();
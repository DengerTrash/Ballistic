const defaultLink = `https://discord.com/api/v10`
const token = Deno.env.get('TOKEN')

const fefe = async function(link: string, req: any) {
    await fetch(link, req).then(async(res) => {
        if(!res.ok){
            const er = await res.json()
            console.dir(er.errors)
            throw new Error(er.message)
        }
        const caught = await res.json()
        return caught;
    }).catch(e => {
        console.error(`| REST API ERROR: ${e}`)
    })
}

const arg1 = '1324304164624400386'
fefe(`${defaultLink}/channels/${arg1}/messages`,{
    method: 'GET',
    headers:{
        Authorization: "Bot " + token,
        "Content-Type": 'application/json',
        'User-Agent': 'DiscordBot (BallisticDev 1)'
    }
}).then(result => {console.log(result)})
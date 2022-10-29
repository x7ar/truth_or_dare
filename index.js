const {  Client, Intents,  MessageEmbed   } = require('discord.js');
const { TOKEN, prefix, translatee,translate_config } = require('./JSON/config.json');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});
const r = require('better-tord');
client.on('ready',() =>{ 
    console.log('ready');
})
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { translate } = require('free-translate');

client.on('messageCreate', async message =>{

    if(message.content.startsWith(prefix + "play")){

        let embed = new MessageEmbed().setTitle('PLAY')
        const play = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('truth')
                .setLabel('truth')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('dare')
                .setLabel('dare')
                .setStyle('SUCCESS'), 
                  new MessageButton()
                .setCustomId('t_or_d')
                .setLabel('truth or dare')
                .setStyle('SUCCESS'),
                
        );
 
        message.channel.send({ embeds:[embed],components:[play]})

        
   

    }
 

    const filter = i => i.customId === 'truth' || 'dare' || 't_or_d'

    const collector = message.channel.createMessageComponentCollector({ filter,  });
    
    collector.on('collect', async i => {

        await i.update({components:[]}).catch(err=>{
            
        })
    });

})

client.on('interactionCreate',  async interaction => {
    const play = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('truth')
            .setLabel('truth')
            .setStyle('SUCCESS'),
            new MessageButton()
            .setCustomId('dare')
            .setLabel('dare')
            .setStyle('SUCCESS'), 
              new MessageButton()
            .setCustomId('t_or_d')
            .setLabel('truth or dare')
            .setStyle('SUCCESS'),
            
    );

    if (!interaction.isButton()) return;

    if (interaction.customId == "truth") {
        if(translatee === "true"){
        const truth = r.get_truth();
        const truth_tr = await translate(`${truth}`, { from: translate_config.form, to:translate_config.to})
        let truth_embed = new MessageEmbed().setTitle(`${truth_tr}`)

     await  interaction.channel.send({components:[play],embeds:[truth_embed]})
    }else{
        const truth = r.get_truth();
        let truth_embed = new MessageEmbed().setTitle(`${truth}`)

        interaction.channel.send({components:[play],embeds:[truth_embed]})
    }}
    if (interaction.customId == "dare") {
        if(translatee === "true"){
        const dare = r.get_dare();
        const dare_tr = await  translate(`${dare}`, { from: translate_config.form, to:translate_config.to})
                let dare_embed = new MessageEmbed().setTitle(`${dare_tr}`)

     await  interaction.channel.send({components:[play],embeds:[dare_embed]})
    }else{
        const dare = r.get_dare();
        let dare_embed = new MessageEmbed().setTitle(`${dare}`)

        interaction.channel.send({components:[play],embeds:[dare_embed]})
    }}

    if (interaction.customId == "t_or_d") {
        if(translatee === "true"){
     const t_or_d = r.get_random_question();
    const t_or_d_tr = await translate(`${t_or_d}`, { from: translate_config.form, to:translate_config.to})
        let tt_or_d_embed = new MessageEmbed().setTitle(`${t_or_d_tr}`)

     await  interaction.channel.send({components:[play],embeds:[tt_or_d_embed]})
    }else{
        const t_or_d = r.get_random_question();
        let tt_or_d_embed = new MessageEmbed().setTitle(`${t_or_d}`)

        interaction.channel.send({components:[play],embeds:[tt_or_d_embed]})
    }}


});

client.login(TOKEN)
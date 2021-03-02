const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('準備完了！');
});

client.login(token);

client.on('message', message => {
    const [command, ...args] = message.content.slice(prefix.length).split(' ')
    console.log(...args);
    if (message.content === `${prefix}`){
       message.channel.send('なぁに？　お兄ちゃん。桃子のことが知りたかったら`!momoko help`を打ってね');
    } 
	else if (message.content === `${prefix} ping`) {
        message.channel.send(`桃子だけど。\nServer Name: ${message.guild.name}\nBot Name: ${message.guild.me}`);
    } 
    else if (message.content === `${prefix} mokomoko`) {
        message.channel.send('お兄ちゃん❓');
    } 
    else if (message.content === `${prefix} help`) {
        message.channel.send('まだ作ってる途中だよ。');
    } 
    else if (message.content === `${prefix} ramen ${args[1]}`) {
        const seconds = Number(args[1])
        if (seconds <= 10 ) {
            if (seconds >= 0) {
                const RAMEN_TIMER = 60000
                message.channel.send(`ラーメンタイマーを${seconds}分に設定したよ❕\n${seconds}分後、あなた宛てにメンションが来ます`);
                setTimeout(() => {
                    message.reply(`${seconds}分たったよ、残さず食べてね。`);
                  }, seconds * RAMEN_TIMER)
            }
            else {
                message.channel.send("マイナスの値を使わないで❕　使い方が分からなかったら`!momoko help`を打ってね");
            }
        }
        else {
            message.channel.send(`そんなに待ったら伸びちゃうでしょ！`);
        }
    }
});
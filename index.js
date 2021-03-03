const Discord = require('discord.js');
const axios = require('axios');
const { prefix, token, channel } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('準備完了！');
});

client.login(token);

client.on('message', message => {
    if (message.channel.name === channel) {
        const [command, ...args] = message.content.slice(prefix.length).split(' ')
        if (message.content === `${prefix}`) {
            message.channel.send('なぁに？　お兄ちゃん。桃子のことが知りたかったら`!momoko help`を打ってね\n');
            message.channel.send(`Server Name: ${message.guild.name}\nBot Name: ${message.guild.me}\nbot URL: https://github.com/Micchili/onichan-bot`);
        }
        else if (message.content === `${prefix} mokomoko`) {
            message.channel.send('お兄ちゃん❓');
        }
        else if (message.content === `${prefix} help`) {
            message.channel.send("お兄ちゃんお姉ちゃんを支える素敵なbot、onichan-bot\n\nコマンド一覧\n\n`!momoko ramen あなたが指定したい分数`\nラーメンタイマーです。10分まで指定できます。負の整数には対応していません\n例\n`!momoko ramen 4`\n`!momoko ramen 6`\n\n`!momoko tenki`\n神奈川県の今日の天気を表示します。");
        }
        else if (message.content === `${prefix} tenki`) {
            axios.get('https://weather.tsukumijima.net/api/forecast/city/140010')
                .then(function (response) {
                    console.log(response.data);
                    message.channel.send(`${response.data.forecasts[0].dateLabel}\n${response.data.forecasts[0].date}\n${response.data.forecasts[0].telop}\n\n${response.data.description.text}`);
                })
                .catch(function (error) {
                    console.log(error);
                    message.channel.send(`今はちょっとダメみたい…。他のコマンドを試してみてね。`);
                })
                .finally(function () {
                });
        }
        else if (message.content === `${prefix} ramen ${args[1]}`) {
            const seconds = Number(args[1])
            if (!isNaN(seconds)) {
                if (seconds <= 10) {
                    if (seconds >= 0) {
                        const RAMEN_TIMER = 60000
                        message.channel.send(`ラーメンタイマーを${seconds}分に設定したよ❕\n${seconds}分後、あなた宛てにメンションが来ます`);
                        setTimeout(() => {
                            message.reply(`${seconds}分たったよ、あったかいうちに食べてね。`);
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
            else {
                message.channel.send("数字を指定してね。");
            }
        }
    }
});
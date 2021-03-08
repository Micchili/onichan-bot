import { Client, Message } from 'discord.js'
import axios from 'axios'
import { token, channel, prefix } from './config.json'
import fs from "fs"

const client = new Client();

const Commands = {
    help: "help",
    tenki: "tenki",
    ramen: "ramen",
    mokomoko: "mokomoko",
    ouen: "ouen"
}

type Error = {
    error: string;
}

client.once('ready', () => console.log('準備完了！'));
client.on('message', (message: Message) => {
    if (message.channel.id === channel) {
        const [command, parameter, operator] = message.content.split(' ')
        if (command === prefix) {
            switch (parameter) {
                case Commands.help: {
                    message.channel.send({
                        embed: {
                            title: "お兄ちゃんお姉ちゃんを支える素敵なbot",
                            description: "github [onichan-bot](https://github.com/Micchili/onichan-bot)\n***コマンド一覧***",
                            thumbnail: {
                                url: "https://millionlive.info/?plugin=attach&refer=%E5%91%A8%E9%98%B2%E6%A1%83%E5%AD%90&openfile=01.png"
                            },
                            fields: [
                                {
                                    name: ":one: !momoko tenki",
                                    value: "神奈川県の今日の天気を表示します。tomorrowと打つことで明日の天気を表示することもできます。\n例 `!momoko tenki tomorrow`"
                                },
                                {
                                    name: ":two: !momoko ramen `セットする分数`",
                                    value: "ラーメンタイマーです。10分まで指定できます。負の整数には対応していません\n例 `!momoko ramen 4` `!momoko ramen 6`"
                                }
                            ]
                        }
                    })
                }
                    break;
                case Commands.ramen: {
                    const seconds = parseInt(operator)
                    if (!isNaN(seconds)) {
                        if (seconds <= 10) {
                            if (seconds >= 0) {
                                const RAMEN_TIMER = 60000
                                message.channel.send(`ラーメンタイマーを${seconds}分に設定したよ❕\n${seconds}分後、あなた宛てにメンションが来ます`);
                                setTimeout(() => {
                                    message.reply(`${seconds}分たったよ、あったかいうちに食べてね。`);
                                }, seconds * RAMEN_TIMER)
                                break
                            }
                            else {
                                message.channel.send("マイナスの値を使わないで❕　使い方が分からなかったら`!momoko help`を打ってね");
                                break
                            }
                        }
                        else {
                            message.channel.send(`そんなに待ったら伸びちゃうでしょ！`);
                            break
                        }
                    }
                    else {
                        message.channel.send("数字を指定してね。");
                        break
                    }
                }
                case Commands.tenki: {
                    const response = axios.get('https://weather.tsukumijima.net/api/forecast/city/140010');
                    if (operator) {
                        if (operator === "tomorrow") {
                            response
                                .then((response) => {
                                    message.channel.send({
                                        embed: {
                                            title: response.data.forecasts[1].dateLabel + ' ' + response.data.forecasts[1].date,
                                            description: response.data.forecasts[1].telop,
                                            thumbnail: {
                                                url: response.data.copyright.image.url
                                            },
                                            fields: [
                                                {
                                                    name: "温度",
                                                    value: "最低温度:" + response.data.forecasts[1].temperature.min.celsius + "\n最高温度:" + response.data.forecasts[1].temperature.max.celsius
                                                },
                                                {
                                                    name: "天気の詳細",
                                                    value: response.data.forecasts[1].detail.weather + "\n\n" + response.data.description.bodyText
                                                },
                                            ]
                                        }
                                    });
                                })
                                .catch((error: Error) => {
                                    console.log(error);
                                    message.channel.send(`今はちょっとダメみたい…。他のコマンドを試してみてね。\n${error.error}`);
                                })
                            break
                        }
                        else {
                            message.channel.send("コマンドが間違ってるよ。明日の天気が知りたい場合は`!momoko tenki tomorrow`と打ってね")
                            break
                        }
                    }
                    else {
                        response
                            .then((response) => {
                                console.log(response.data);
                                message.channel.send({
                                    embed: {
                                        title: response.data.forecasts[0].dateLabel + ' ' + response.data.forecasts[0].date,
                                        description: response.data.forecasts[0].telop,
                                        thumbnail: {
                                            url: response.data.copyright.image.url
                                        },
                                        fields: [
                                            {
                                                name: "温度",
                                                value: "最低温度:" + response.data.forecasts[0].temperature.min.celsius + "\n最高温度:" + response.data.forecasts[0].temperature.max.celsius
                                            },
                                            {
                                                name: "天気の詳細",
                                                value: response.data.forecasts[0].detail.weather + "\n\n" + response.data.description.bodyText
                                            },
                                        ]
                                    }
                                });
                            })
                            .catch((error: Error) => {
                                console.log(error);
                                message.channel.send(`今はちょっとダメみたい…。他のコマンドを試してみてね。\n${error.error}`);
                            })
                        break
                    }
                }
                case Commands.mokomoko: {
                    message.channel.send("お兄ちゃん❓")
                    break
                }
                case Commands.ouen: {
                    const channel = message.member?.voice.channel
                    if (channel) {
                        channel.join()
                            .then(connection => {
                                const dispatcher = connection.play(fs.createReadStream('src/ouen.mp3'))
                                dispatcher.on('start', () => {
                                    dispatcher.setVolume(0.7)
                                    console.log("再生成功")
                                    message.reply(`フレー❕　フレー❕　お兄ちゃん❕`);
                                })

                                dispatcher.on('error', (err) =>{
                                    console.log(err)
                                    message.channel.send(`今はちょっとダメみたい…他のコマンドを試してみてね。`);
                                    connection.disconnect();
                                })

                                dispatcher.on('finish', () => {
                                    console.log('再生終わり');
                                    connection.disconnect();
                                });
                            });
                    }
                    else {
                        message.channel.send("どこかのボイスチャンネルに入ってね❕")
                    }
                    break
                }
                default:
                    message.channel.send("桃子のことが知りたかったら`!momoko help`を打ってね")
                    break
            }
        }
    }
})

client.login(token)
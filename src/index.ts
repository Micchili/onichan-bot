import { Client, Message } from 'discord.js'
import fs from "fs"

import { token, channel, prefix } from './config.json'
import { help } from './function/help'
import { ramen } from './function/ramen'
import { tenki } from './function/tenki'


const COMMAND_LIST = {
    HELP: "help",
    TENKI: "tenki",
    RAMEN: "ramen",
    MOKOMOKOK: "mokomoko",
    OUEN: "ouen"
}

const client = new Client();

client.once('ready', () => console.log('準備完了！'));
client.on('message', async (message: Message): Promise<void> => {
    if (message.channel.id === channel) {
        const [command, parameter, operator] = message.content.split(' ')
        if (command === prefix) {
            switch (parameter) {
                case COMMAND_LIST.HELP: {
                    message.channel.send(help())
                    break;
                }
                case COMMAND_LIST.RAMEN: {
                    const seconds = parseInt(operator)
                    const { massage , correct } = ramen(seconds)
                    if (correct) {
                        message.channel.send(massage)
                        const RAMEN_TIMER = 60000
                        setTimeout(() => {
                            message.reply(`${seconds}分たったよ、あったかいうちに食べてね。`)
                        }, seconds * RAMEN_TIMER)
                        break
                    }
                    else {
                        message.channel.send(massage)
                        break
                    }
                }
                case COMMAND_LIST.TENKI: {
                    const massage = await tenki(Number(operator))
                    message.channel.send(massage)
                    break
                }
                case COMMAND_LIST.MOKOMOKOK: {
                    message.channel.send("お兄ちゃん❓")
                    break
                }
                case COMMAND_LIST.OUEN: {
                    const channel = message.member?.voice.channel
                    if (channel) {
                        channel.join()
                            .then(connection => {
                                const dispatcher = connection.play(fs.createReadStream('src/voice/ouen.mp3'))
                                dispatcher.on('start', () => {
                                    dispatcher.setVolume(0.5)
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
                    message.channel.send("そんなコマンドは無いよ。桃子のことが知りたかったら`!momoko help`を打ってね")
                    break
            }
        }
    }
})

client.login(token)
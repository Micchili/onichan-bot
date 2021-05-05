import { Client, Message } from 'discord.js'
import fs from "fs"

import { token, channel, prefix } from './config.json'
import { help } from './function/help'
import { ramen , timer } from './function/ramen'
import { tenki } from './function/tenki'


const CommandList = {
    help: "help",
    tenki: "tenki",
    ramen: "ramen",
    mokomoko: "mokomoko",
    ouen: "ouen"
}

const client = new Client();

client.once('ready', () => console.log('準備完了！'));
client.on('message', async (message: Message): Promise<void> => {
    if (message.channel.id === channel) {
        const [command, parameter, operator] = message.content.split(' ')
        if (command === prefix) {
            switch (parameter) {
                case CommandList.help: {
                    message.channel.send(help())
                    break;
                }
                case CommandList.ramen: {
                    const seconds = parseInt(operator)
                    const { massage , correct } = ramen(seconds)
                    if (correct) {
                        message.channel.send(massage)
                        message.reply(await timer(seconds));
                        break
                    }
                    else {
                        message.channel.send(massage)
                        break
                    }
                }
                case CommandList.tenki: {
                    const massage = await tenki()
                    message.channel.send(massage)
                    break
                }
                case CommandList.mokomoko: {
                    message.channel.send("お兄ちゃん❓")
                    break
                }
                case CommandList.ouen: {
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
import { Client, Message } from 'discord.js';
import fs from 'fs';

import { token, channel, prefix } from './config.json';
import { help } from './function/help';
import { ramen, timer } from './function/ramen';
import { tenki } from './function/tenki';
import { areaCode } from './function/areaCode';
import { Pref } from './pref';

const COMMAND_LIST = {
  HELP: 'help',
  TENKI: 'tenki',
  RAMEN: 'ramen',
  MOKOMOKOK: 'mokomoko',
  OUEN: 'ouen',
  AREA: 'area'
};

const client = new Client();

client.once('ready', () => console.log('準備完了！'));
client.on('message', async (message: Message): Promise<void> => {
  if (message.channel.id === channel) {
    const [command, parameter, operator] = message.content.split(' ')
    if (command === prefix) {
      switch (parameter) {
        case COMMAND_LIST.HELP: {
          message.reply(help())
          break;
        }
        // ramen
        case COMMAND_LIST.RAMEN: {
          const ramenResult = ramen(operator);
          message.reply(ramenResult.message);
          if (ramenResult.success) {
            const timerMessage = await timer(operator);
            message.reply(timerMessage);
          }
          break;
        }
        // tenki
        case COMMAND_LIST.TENKI: {
          const tenkiResult = await tenki(operator);
          message.reply(tenkiResult.message);
          break;
        }
        case COMMAND_LIST.MOKOMOKOK: {
          message.reply('お兄ちゃん❓')
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
                  console.log('再生成功')
                  message.reply(`フレー❕　フレー❕　お兄ちゃん❕`);
                })

                dispatcher.on('error', (err) => {
                  console.log(err)
                  message.reply(`今はちょっとダメみたい…他のコマンドを試してみてね。`);
                  connection.disconnect();
                })

                dispatcher.on('finish', () => {
                  console.log('再生終わり');
                  connection.disconnect();
                });
              });
          }
          else {
            message.reply('どこかのボイスチャンネルに入ってね❕')
          }
          break
        }
        case COMMAND_LIST.AREA: {
          if (operator) {
            message.reply(await areaCode(operator as Pref))
          }
          else {
            message.reply('検索したい県や地方を入力してね')
          }
        }
          break
        default:
          message.reply('そんなコマンドは無いよ。桃子のことが知りたかったら`!momoko help`を打ってね')
          break
      }
    }
  }
})

client.login(token)

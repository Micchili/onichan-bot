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
  AREA: 'area',
};

const client = new Client();

client.once('ready', () => console.log('準備完了！'));
client.on('message', async (message: Message): Promise<void> => {
  if (message.channel.id === channel) {
    const [command, parameter, operator] = message.content.split(' ');
    if (command === prefix) {
      switch (parameter) {
        case COMMAND_LIST.HELP: {
          message.channel.send(help());
          break;
        }
        // ramen
        case COMMAND_LIST.RAMEN: {
          const ramenResult = ramen(operator);
          message.channel.send(ramenResult.message);
          if (ramenResult.success) {
            const timerMessage = await timer(operator);
            message.reply(timerMessage);
          }
          break;
        }
        // tenki
        case COMMAND_LIST.TENKI: {
          const tenkiResult = await tenki(operator);
          message.channel.send(tenkiResult.message);
          break;
        }
        case COMMAND_LIST.MOKOMOKOK: {
          message.channel.send('お兄ちゃん❓');
          break;
        }
        case COMMAND_LIST.OUEN: {
          const channel = message.member?.voice.channel;
          if (channel) {
            channel.join().then((connection) => {
              const dispatcher = connection.play(
                fs.createReadStream('src/voice/ouen.mp3')
              );
              dispatcher.on('start', () => {
                dispatcher.setVolume(0.5);
                console.log('再生成功');
                message.channel.send(`フレー❕　フレー❕　お兄ちゃん❕`);
              });

              dispatcher.on('error', (err) => {
                console.log(err);
                message.channel.send(
                  `今はちょっとダメみたい…他のコマンドを試してみてね。`
                );
                connection.disconnect();
              });

              dispatcher.on('finish', () => {
                console.log('再生終わり');
                connection.disconnect();
              });
            });
          } else {
            message.channel.send('どこかのボイスチャンネルに入ってね❕');
          }
          break;
        }
        case COMMAND_LIST.AREA:
          {
            if (operator) {
              message.channel.send(await areaCode(operator as Pref));
            } else {
              message.channel.send('検索したい県や地方を入力してね');
            }
          }
          break;
        default:
          message.channel.send(
            'そんなコマンドは無いよ。桃子のことが知りたかったら`!momoko help`を打ってね'
          );
          break;
      }
    }
  }
});

client.login(token);

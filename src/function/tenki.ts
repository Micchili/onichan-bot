import axios from 'axios';
import { MessageEmbed } from 'discord.js';

interface TenkiResult {
  message: MessageEmbed | string;
  success: boolean;
}

export async function tenki(areaCode = '140000'): Promise<TenkiResult> {
  if (
    areaCode.length !== 6 ||
    isNaN(parseInt(areaCode)) ||
    !parseInt(areaCode)
  ) {
    return {
      message: 'エリアコードが間違ってるよ',
      success: false,
    };
  }

  try {
    const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${areaCode}.json`;
    const response = await axios.get(url);
    const kionMin = response.data[0].timeSeries[2].areas[0].temps[0];
    const kionMax = response.data[0].timeSeries[2].areas[0].temps[1];
    const weathersText = response.data[0].timeSeries[0].areas[1].weathers[0];
    const todayTime = response.data[0].reportDatetime;
    const town = response.data[0].publishingOffice;

    const embedMessage = new MessageEmbed();
    embedMessage.setTitle(town + todayTime);
    embedMessage.addField('温度', `最低温度:${kionMin}\n最高温度:${kionMax}`);
    embedMessage.addField('天気の詳細', weathersText);

    return {
      message: embedMessage,
      success: true,
    };
  } catch (error) {
    return {
      message: `サーバーがエラーを起こしているか、エリアコードが間違ってるよ\n${error}`,
      success: false,
    };
  }
}

import Discord from "discord.js"
import axios from 'axios'

export async function tenki() {
    const pathCode = 140000
    const response = await axios.get(`https://www.jma.go.jp/bosai/forecast/data/forecast/${pathCode}.json`) as any
    if (response) {
        const kionMin = response.data[0].timeSeries[2].areas[0].temps[0]
        const kionMax = response.data[0].timeSeries[2].areas[0].temps[1]
        const weathersText = response.data[0].timeSeries[0].areas[1].weathers[0]
        const embed = new Discord.MessageEmbed()
            .setTitle("神奈川県横浜市" + response.data[0].reportDatetime)
            .addField("温度", "最低温度:" + kionMin + "\n最高温度:" + kionMax)
            .addField("天気の詳細", weathersText)
        return embed
    } else {
        return "今はちょっとダメみたい…。他のコマンドを試してみてね。"
    }
}
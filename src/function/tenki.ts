import Discord from "discord.js"
import axios from 'axios'

export async function tenki(areaCode?: string) {
    let pathCode
    if (areaCode) {
        pathCode = areaCode
    }
    else {
        pathCode = '140000'
    }
    try {
        const response: any = await axios.get(`https://www.jma.go.jp/bosai/forecast/data/forecast/${pathCode}.json`)
        const kionMin = response.data[0].timeSeries[2].areas[0].temps[0]
        const kionMax = response.data[0].timeSeries[2].areas[0].temps[1]
        const weathersText = response.data[0].timeSeries[0].areas[1].weathers[0]
        const todayTime = response.data[0].reportDatetime
        const town = response.data[0].publishingOffice

        const embed = new Discord.MessageEmbed()
            .setTitle(town + todayTime)
            .addField("温度", "最低温度:" + kionMin + "\n最高温度:" + kionMax)
            .addField("天気の詳細", weathersText)

        return embed
    } catch (error) {
        return "サーバーがエラーを起こしているか、エリアコードが間違ってるよ\n" + `${error}`
    }
}
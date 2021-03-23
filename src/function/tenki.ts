import Discord from "discord.js"
import axios from 'axios'

export async function tenki(isDate?: string) {
    const response = await axios.get('https://weather.tsukumijima.net/api/forecast/city/140010')
    if(response) {
        if(!isDate) {
            const embed = new Discord.MessageEmbed()
                .setTitle(response.data.forecasts[0].dateLabel + ' ' + response.data.forecasts[0].date)
                .setImage(response.data.forecasts[0].image.url)
                .setDescription(response.data.forecasts[0].telop)
                .setThumbnail(response.data.copyright.image.url)
                .addField("温度" , "最低温度:" + response.data.forecasts[0].temperature.min.celsius + "\n最高温度:" + response.data.forecasts[0].temperature.max.celsius)
                .addField("天気の詳細" , response.data.forecasts[0].detail.weather + "\n\n" + response.data.description.bodyText)
            return embed
        } else if(isDate === "tomorrow") {
            const embed = new Discord.MessageEmbed()
                .setTitle(response.data.forecasts[1].dateLabel+ ' ' + response.data.forecasts[1].date)
                .setImage(response.data.forecasts[1].image.url)
                .setDescription(response.data.forecasts[1].telop)
                .setThumbnail(response.data.copyright.image.url)
                .addField("温度" , "最低温度:" + response.data.forecasts[1].temperature.min.celsius + "\n最高温度:" + response.data.forecasts[1].temperature.max.celsius)
                .addField("天気の詳細" , response.data.forecasts[1].detail.weather + "\n\n" + response.data.description.bodyText)
            return embed
        } else {
            return "そんなコマンドは無いよ。もしかして=>`tomorrow`"
        }
    } else {
        return "今はちょっとダメみたい…。他のコマンドを試してみてね。"
    }
}
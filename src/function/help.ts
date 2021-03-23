import Discord from "discord.js"

export function help() {
    const embed = new Discord.MessageEmbed()
        .setTitle("お兄ちゃんお姉ちゃんを支える素敵なbot")
        .setDescription("github [onichan-bot](https://github.com/Micchili/onichan-bot)\n***コマンド一覧***")
        .setThumbnail("https://millionlive.info/?plugin=attach&refer=%E5%91%A8%E9%98%B2%E6%A1%83%E5%AD%90&openfile=01.png")
        .addField(":one: !momoko tenki" , "神奈川県の今日の天気を表示します。tomorrowと打つことで明日の天気を表示することもできます。\n例 `!momoko tenki tomorrow`")
        .addField(":two: !momoko ramen `セットする分数`" , "ラーメンタイマーです。10分まで指定できます。\n例 `!momoko ramen 4` `!momoko ramen 6`")
        .addField(":three: !momoko ouen" , "応援してくれます")

    return embed
}
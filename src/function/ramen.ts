export function ramen(second: number): {massage: string , correct?: boolean} {
    if (!isNaN(second)) {
        if (second <= 10) {
            if (second >= 0) {
                return {
                    massage: `ラーメンタイマーを${second}分に設定したよ❕\n${second}分後、あなた宛てにメンションが来ます`,
                    correct: true
                }
            }
            else {
                return {
                    massage: "マイナスの値を使わないで❕　使い方が分からなかったら`!momoko help`を打ってね"
                }
            }
        }
        else {
            return {
                massage: "そんなに待ったら伸びちゃうでしょ！"
            }
        }
    }
    else {
        return {
            massage: "数字を指定してね。"
        }
    }
}

export function timer(second: number): Promise<string> {
    const RAMEN_TIMER = 60000
    return new Promise(() => {
        setTimeout(() => {
            `${second}分たったよ、あったかいうちに食べてね。`
        }, second * RAMEN_TIMER)
    })
}
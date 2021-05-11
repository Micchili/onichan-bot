interface RamenResult {
  message: string;
  success: boolean;
}

export function ramen(arg: string): RamenResult {
  const minutes = parseInt(arg);

  if (isNaN(minutes)) {
    return {
      message: '数字を指定してね。',
      success: false,
    };
  }

  if (!minutes) {
    return {
      message:
        'マイナスの値を使わないで❕　使い方が分からなかったら`!momoko help`を打ってね',
      success: false,
    };
  } else if (minutes > 15) {
    return {
      message: 'そんなに待ったら伸びちゃうでしょ！',
      success: false,
    };
  } else {
    return {
      message: `ラーメンタイマーを${minutes}分に設定したよ❕\n${minutes}分後、あなた宛てにメンションが来ます`,
      success: true,
    };
  }
}

/**
 * タイマー
 * @param { string } arg 計測する時間(分)
 * @returns { string } 完了通知
 */
export async function timer(arg: string): Promise<string> {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(parseInt(arg) * 60000);
  return `${arg}分たったよ、あったかいうちに食べてね。`;
}

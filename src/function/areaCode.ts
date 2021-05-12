import axios from 'axios';
import { Pref } from '../pref';

export async function areaCode(pref: Pref): Promise<any> {
    const url = 'http://www.jma.go.jp/bosai/common/const/area.json'
    const ereaCodeJson = await axios.get(url)
    if (ereaCodeJson) {
        for (const key in ereaCodeJson.data.offices) {
            if (ereaCodeJson.data.offices[key].name == pref) {
                return(pref + "のエリアコード:" + key)
            }
        }
        return("該当するエリアコードが無かったよ。")
    }
    return '該当するエリアコードが無かったよ。';
  }
}

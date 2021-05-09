import axios from 'axios'
import { Pref } from '../pref'
export async function areaCode(pref: Pref): Promise<any> {
    const ereaCodeJson = await axios.get('http://www.jma.go.jp/bosai/common/const/area.json') as any
    if (ereaCodeJson) {
        for (const key in ereaCodeJson.data.offices) {
            if (ereaCodeJson.data.offices[key].name == pref) {
                return(pref + "のエリアコード:" + key)
            }
        }
        return("該当するエリアコードが無かったよ。")
    }
}
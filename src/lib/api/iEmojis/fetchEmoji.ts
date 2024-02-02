import { Iemoji, MtntEmoji } from "../../../interfaces/IEmoji";
import { read, readAsObject } from "../../utils/Dependency";
import sharp from "sharp";

export async function fetchEmoji(shortCode: string, size: number = 0) {
    let iemoji: Iemoji | undefined = (await readAsObject<Iemoji[]>(`iemojis.json`)).filter(e => e.emoji == shortCode).firstOrDefault();
    let mtntemoji = (await readAsObject<MtntEmoji[]>(`mtnt_data.json`)).filter(e => e.short == shortCode).firstOrDefault();

    if(mtntemoji != null)
    {
      let trueSrc = mtntemoji.src.substring(0, mtntemoji.src.lastIndexOf('/')+1)+ mtntemoji.short+".webp";
      if(size != 0)
      {
        let tempPath = './temp.webp';
        //let res = await sharp(await read(`https://files.teslasp2.com/assets/mutant-standard/${trueSrc}`)).resize(size,size,{fit: 'contain'}).webp().toFile(tempPath);

        return {src: trueSrc, fallback: iemoji?.fallback??'❔', tooltip: iemoji != undefined ? iemoji.tooltip : mtntemoji.desc, link: iemoji?.link, color: iemoji?.color };
      }
      else
        return {src: trueSrc, fallback: iemoji?.fallback??'❔', tooltip: iemoji != undefined ? iemoji.tooltip : mtntemoji.desc, link: iemoji?.link, color: iemoji?.color };
    }
    else {
      let mtntemojiCode = (await readAsObject<MtntEmoji[]>(`mtnt_data.json`)).filter(e => e.code.includes(+shortCode)).firstOrDefault();
      if(mtntemojiCode != null)
      {
        let trueSrc = mtntemojiCode.src.substring(0, mtntemojiCode.src.lastIndexOf('/')+1)+ mtntemojiCode.short+".webp";
        if(size != 0)
        {

        }
        else
          return {src: trueSrc, fallback: iemoji?.fallback??'❔', tooltip: iemoji != undefined ? iemoji.tooltip : mtntemojiCode.desc, link: iemoji?.link, color: iemoji?.color };
      }
      else return null;
    }
}
import { Iemoji, MtntEmoji } from "../../../interfaces/IEmoji";
import { del, read, readAsObject } from "../../utils/Dependency";
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
        let readF = await read(`../files/assets/mutant-standard/${trueSrc}`);
        await sharp(readF).resize(size,size,{fit: 'contain'}).webp().toFile(tempPath);
        let b64 = 'data:image/webp;base64,'+await read(tempPath, 'base64');
        await del(tempPath);

        return {src: b64, fallback: iemoji?.fallback??'❔', tooltip: iemoji != undefined ? iemoji.tooltip : mtntemoji.desc, link: iemoji?.link, color: iemoji?.color };
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
          let tempPath = './temp.webp';
          let readF = await read(`../files/assets/mutant-standard/${trueSrc}`);
          await sharp(readF).resize(size,size,{fit: 'contain'}).webp().toFile(tempPath);
          let b64 = 'data:image/webp;base64,'+await read(tempPath, 'base64');
          await del(tempPath);
  
          return {src: b64, fallback: iemoji?.fallback??'❔', tooltip: iemoji != undefined ? iemoji.tooltip : mtntemojiCode.desc, link: iemoji?.link, color: iemoji?.color };
        }
        else
          return {src: trueSrc, fallback: iemoji?.fallback??'❔', tooltip: iemoji != undefined ? iemoji.tooltip : mtntemojiCode.desc, link: iemoji?.link, color: iemoji?.color };
      }
      else return null;
    }
}
import { Iemoji, MtntEmoji } from "../../../interfaces/IEmoji";

export async function fetchEmoji(shortCode: string) {
    let iemoji: Iemoji | undefined = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/iemojis.json`)).json()) as Iemoji[]).filter(e => e.emoji == shortCode).firstOrDefault();
    let mtntemoji = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/mtnt_data.json`)).json()) as MtntEmoji[]).filter(e => e.short == shortCode).firstOrDefault();

    if(mtntemoji != null)
    {
      let trueSrc = mtntemoji.src.substring(0, mtntemoji.src.lastIndexOf('/')+1)+ mtntemoji.short+".webp";
      return {src: mtntemoji.src, fallback: iemoji?.fallback??'❔', tooltip: iemoji != undefined ? iemoji.tooltip : mtntemoji.desc, link: iemoji?.link, color: iemoji?.color };
    }
    else {
      let mtntemojiCode = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/mtnt_data.json`)).json()) as MtntEmoji[]).filter(e => e.code.includes(+shortCode)).firstOrDefault();
      if(mtntemojiCode != null)
      {
        let trueSrc = mtntemojiCode.src.substring(0, mtntemojiCode.src.lastIndexOf('/')+1)+ mtntemojiCode.short+".webp";
        return {src: mtntemojiCode.src, fallback: iemoji?.fallback??'❔', tooltip: iemoji != undefined ? iemoji.tooltip : mtntemojiCode.desc, link: iemoji?.link, color: iemoji?.color };
      }
      else return null;
    }
}
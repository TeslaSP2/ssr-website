import { Handler } from "hono";
import { readAsObject } from "../../lib/utils/Dependency";

interface MtntEmoji {
    cat: string;
    code: number[] | string;
    desc: string;
    root: string;
    short: string;
    src: string;
}

export const getEmojisTable: Handler <
    {},
  "/emojis"
> = async (c) => {
    const data = await getRemoteEmojis();
    return c.html(data);
}

async function getRemoteEmojis() {
    let ret = `<!DOCTYPE html>
    <table
        <thead>
            <tr>
                <th style="border: 1px solid black; border-radius: 5px;"><a href "https://mutant.tech/">Emoji from Mutant standard</a></th>
                <th style="border: 1px solid black; border-radius: 5px;">Original</th>
                <th style="border: 1px solid black; border-radius: 5px;">Category</th>
                <th style="border: 1px solid black; border-radius: 5px;">Unicode</th>
                <th style="border: 1px solid black; border-radius: 5px;">Description</th>
                <th style="border: 1px solid black; border-radius: 5px;">Root</th>
                <th style="border: 1px solid black; border-radius: 5px;">Short code</th>
                <th style="border: 1px solid black; border-radius: 5px;">Image</th>
            </tr>
        </thead>
        <tbody>`;

    let emojis = await readAsObject<MtntEmoji[]>('mtnt_data.json');

    for(const emoji of emojis)
    {
        let realEmoji = typeof emoji.code === 'string' ? 'None' : String.fromCodePoint(...emoji.code);
        let codes = typeof emoji.code === 'string' ? '' : emoji.code.rasterize();

        let trueEnd = emoji.src.substring(0, emoji.src.lastIndexOf('/')+1)+ emoji.short+".webp"

        let fullSrc = "http://files.teslasp2.com/assets/mutant-standard/"+trueEnd;
        ret += `
        <tr>
            <td style="border: 1px solid black; border-radius: 5px;" align="center"><img src="${fullSrc}" width="32" height="32" /></td>
            <td style="border: 1px solid black; border-radius: 5px;" align="center">${realEmoji}</td>
            <td style="border: 1px solid black; border-radius: 5px;">${emoji.cat}</td>
            <td style="border: 1px solid black; border-radius: 5px;" align="center">${codes}</td>
            <td style="border: 1px solid black; border-radius: 5px;">${emoji.desc}</td>
            <td style="border: 1px solid black; border-radius: 5px;" align="center">${emoji.root}</td>
            <td style="border: 1px solid black; border-radius: 5px;" align="center">${emoji.short}</td>
            <td style="border: 1px solid black; border-radius: 5px;">${trueEnd}</td>
        </tr>` 
    }

    ret += `</tbody>
    </table>`

    return ret;
}

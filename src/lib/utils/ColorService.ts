import { Palette } from "../../interfaces/Palette";
import { readAsObject } from "./Dependency";
import { RandomInt } from "./extension-methods";

const defPalette: Palette = {tag: 'default', color: ['00968F'], secondColor: "bdb46a", defColor: "0", grad: true, gradAngle: "45", lightColor: 'ffffff', darkColor: '006e6d', secondDarkColor: '807947', invColor: '1d1d1d' };

export async function 

getDefColor(search: string | undefined) {
  if(search != undefined)
    for(let tag of await readAsObject<Palette[]>(`colorTags.json`))
    {
      if(tag.tag == search) {
        if(tag.defColor != undefined)
        {
          if(!isNaN(+tag.defColor))
          {
            if((+tag.defColor) <= tag.color.length)
              return tag.color[+tag.defColor - 1];
            else
            {
              switch(tag.defColor)
              {
                case "rand": return tag.color[RandomInt(tag.color.length)];
                case "def": return tag.color.firstOrDefault();
                default: return tag.defColor;
              }
            }
          }
          else
          {
            switch(tag.defColor)
            {
              case "rand": return tag.color[RandomInt(tag.color.length)];
              case "def": return tag.color.firstOrDefault();
              default: return tag.defColor;
            }
          }
        }
        else
          return tag.color.firstOrDefault();
      }
    }

  return defPalette.color.firstOrDefault();
}
import { Char, SetDNI } from "../../../interfaces/Id";
import { Tag } from "../../../interfaces/Tag";
import { readAsObject } from "../../utils/Dependency";
import { Interpreter } from "../../utils/extension-methods";

export async function fetchTagsCodes(lang: string = "en") {
    let tags = await readAsObject<Tag[]>('tags.json');
    let ocTags = await getBiosTags();
    let normalTags = tags.filter(t => ocTags.filter(oc => oc.code == t.code).length <= 0).sort((s1, s2) => {
      let s1Trans = Interpreter(s1.name, lang).stuff.firstOrDefault();
      let s2Trans = Interpreter(s2.name, lang).stuff.firstOrDefault();

      return s1Trans.localeCompare(s2Trans);
    });
    ocTags.push(...normalTags);

    let ret: string[] = [];
    for (const tag of ocTags) {
      ret.push(tag.code);
    }

    return ret;
  }

  async function getBiosTags() {
    let Bios = await readAsObject<SetDNI[]>('oc-bios.json');

    let bios: Tag[] = [];

    for(const set of Bios)
    {
      for(const bio of set.DNIs)
      {
        if(!bio.hidden)
          for(const alt of bio.alts)
          {
            try {
              const char = await readAsObject<Char>(`oc-bios/chars/${bio.oc}/${alt.source}.json`);
              if (char.hidden != true)
              {
                let possible = (await readAsObject<Tag[]>('tags.json')).filter(t => t.code == alt.source).firstOrDefault();
                if(possible != null)
                  bios.push(possible);
              }
            } catch (error) {
              
            }
          }
      }
    }

    return bios;
  }
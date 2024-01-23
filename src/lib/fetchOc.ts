import { Char } from "../interfaces/Id";
import { Interpreter, RandomInt } from "./extension-methods";

export async function fetchOc(source: string, lang: string) {
    let char = await getSpecificChar(source, source);
    if(char != undefined)
    {
        let name = char?.name+' '+(char?.firstName != undefined ? ' '+char?.firstName : '')+(char?.lastName != undefined ? ' '+char?.lastName : '');
        let description = "";
        if(char.personalData != null)
            if(char.personalData.alias != null)
                for(const alias of char.personalData.alias) {
                    if(description.length <= 0)
                        description += "A.k.a. "
                    description += " \""+alias+"\"";
                    if(char.personalData.alias.indexOf(alias) == char.personalData.alias.length -1)
                        description+= "\n";
                }

        description += Interpreter(char.personality, lang).stuff.rasterize();
        
        return {source: source, name: name, description: description, featuredImage: char.personalData.headshot};
    }

    return {source: source, name: 'Unknown', description: 'idk mate'}
}

async function getSpecificChar(bio: string, source: string, oc?: string) {
    let salt = RandomInt(9999999999);
    let esChar: Char | undefined;
    if(oc == undefined)
      oc = bio;

    try {
      esChar = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/oc-bios/chars/${oc}/${source}.json?${salt}`)).json()) as Char);
    } catch (error) {
      esChar = undefined;
    }

    return esChar;
}
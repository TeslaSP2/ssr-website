import { Palette } from "../../interfaces/Palette";
import { readAsObject } from "./Dependency";
import Color from 'color';
import { RandomInt } from "./extension-methods";

const defPalette: Palette = {tag: 'default', color: ['00968F'], secondColor: "bdb46a", defColor: "0", grad: true, gradAngle: "45", lightColor: 'ffffff', darkColor: '006e6d', secondDarkColor: '807947', invColor: '1d1d1d' };

export async function getPalette(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search)
      {
        let tagCopy = tag;
        if (tagCopy.grad == undefined) tagCopy.grad = defPalette.grad;
        if (tagCopy.invColor == undefined) tagCopy.invColor = defPalette.invColor;
        return tagCopy;
      }
    }

  return defPalette;
}

export async function getColor(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search)
        return tag.color;
    }

  return defPalette.color;
}

export async function getSecondColor(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search) {
        if(tag.secondColor != undefined)
        {
          if(!isNaN(+tag.secondColor))
            return tag.color[+tag.secondColor - 1];
          else
          {
            switch(tag.secondColor)
            {
              case "rand": return tag.color[RandomInt(tag.color.length)];
              case "def": return tag.color[tag.color.length > 1 ? 1 : 0];
              case "comp": {
                let color = Color('#'+(await getColor(search, tags)).firstOrDefault(), "hex");

                return Color.rgb(255 - color.red(), 255 - color.green(), 255 - color.blue()).hex().substring(1);
              }
              default: return tag.secondColor;
            }
          }
        }
        else
          return defPalette.secondColor;
      }
    }

  return defPalette.secondColor;
}

export async function getDefColor(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
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

export async function asGrad(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search && tag.grad != undefined)
        return tag.grad;
    }

  return defPalette.grad!;
}

export async function getGradAngle(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search && tag.gradAngle != undefined) {
        if(!isNaN(+tag.gradAngle))
          return +tag.gradAngle;
        else
        {
          let isNumber = !isNaN(+tag.gradAngle);
          
          if(isNumber)
            return +tag.gradAngle;
          else
          {
            switch(tag.gradAngle)
            {
              case "up": return 0;
              case "up right": return 45;
              case "right": return 90;
              case "down right": return 135;
              case "down": return 180;
              case "down left": return 225;
              case "left": return 270;
              case "up left": return 315;
              case "cocaine": return RandomInt(361);
            }
          }
        }
      }
    }

  return +defPalette.gradAngle!;
}

export async function getLightColor(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined) {
    if(!search.includes("#"))
      for(let tag of tags)
      {
        if(tag.tag == search) {
          if(tag.lightColor != undefined)
            return tag.lightColor;
          else if(tag.lightColor == undefined)
          {
            let color = Color('#'+await getDefColor(search, tags), "hex");
            
            if(getLuminance(color) > 128)
              return color.mix(Color("black"), 0.65).hex().substring(1);
            else
              return color.mix(Color("white"), 0.8).hex().substring(1);
          }
        }
      }
    else
    {
      let color = Color(search, "hex");
      
      if(getLuminance(color) > 128)
        return color.mix(Color("black"), 0.65).hex().substring(1);
      else
        return color.mix(Color("white"), 0.8).hex().substring(1);
    }
  }

  return defPalette.lightColor;
}

export async function hasLightColor(search: string | undefined, tags?: Palette[]) {  
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search) {
        if(tag.lightColor != undefined)
          return true;
        else
          return false;
      }
    }

  return false;
}

export async function getDarkColor(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    if(!search.includes("#"))
    {
      for(let tag of tags)
      {
        if(tag.tag == search) {
          if(tag.darkColor != undefined)
            return tag.darkColor;
          else if(tag.darkColor == undefined)
          {
            let color = Color('#'+await getDefColor(search, tags), "hex");

            return color.mix(Color("black"), 0.25).hex().substring(1);
          }
        }
      }
    }
    else
    {
      let color = Color(search, "hex");
    
      return color.mix(Color("black"), 0.25).hex().substring(1);
    }

  return defPalette.darkColor;
}

export async function hasDarkColor(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search) {
        if(tag.darkColor != undefined)
          return true;
        else
          return false;
      }
    }
  
  return false;
}

export async function getSecondDarkColor(color_def: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(color_def != undefined)
    if(!color_def.includes("#"))
    {
      for(let tag of tags)
      {
        if(tag.tag == color_def) {
          if(tag.secondDarkColor != undefined)
            return tag.secondDarkColor;
          else if(tag.secondDarkColor == undefined)
          {
            let color = Color('#'+await getSecondColor(color_def, tags), "hex");

            return color.mix(Color("black"), 0.25).hex().substring(1);
          }
        }
      }
    }
    else
    {
      let color = Color(color_def, "hex");
    
      return color.mix(Color("black"), 0.25).hex().substring(1);
    }

  return defPalette.secondDarkColor;
}

export async function hasSecondDarkColor(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search) {
        if(tag.secondDarkColor != undefined)
          return true;
        else
          return false;
      }
    }
  
  return false;
}

export async function getInvColor(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search && tag.invColor != undefined) {
        return tag.invColor;
      }
    }

  return defPalette.invColor;
}

export async function hasSpecialColor(search: string | undefined, tags?: Palette[]) {
  if(tags == undefined)
    tags = await readAsObject<Palette[]>(`colorTags.json`);

  if(search != undefined)
    for(let tag of tags)
    {
      if(tag.tag == search)
        return true;
    }

  return false;
}

export async function colorConditional(tag: string, tags?: Palette[]) {
  let rasterizedColorArray = function (colors: string[], grad: number, asGrad: boolean = true) {
    let colorsFinal = "";
    if(colors.length > 1)
    {
      let colorStep = Math.trunc(100 / colors.length);
      let prevPercent = 0;
      let currPercent = 0;

      for(let i = 0; i < colors.length; i++)
      {
        prevPercent = currPercent;
        currPercent = currPercent + colorStep;

        colorsFinal = colorsFinal+'#'+colors[i]+(!asGrad ? ((prevPercent > 0 ? (' '+prevPercent+'%') : '') + (currPercent < 100 ? (' '+currPercent+'%') : '')) : '')+(i < colors.length-1 ? ',' : '');
      }
    }
    else
      colorsFinal ='#'+colors.firstOrDefault()+', #'+colors.firstOrDefault();
    
    return 'linear-gradient('+grad+'deg, '+colorsFinal+')';
  }
  
  if(tag != undefined)
    return (await hasSpecialColor(tag, tags)) ? rasterizedColorArray(await getColor(tag, tags), await getGradAngle(tag, tags), await asGrad(tag, tags)) : undefined;
  else return undefined;
}

export function getLuminance(color: Color) {
  return Math.sqrt(0.299 * Math.pow(color.red() / 100, 2) + 0.587 * Math.pow(color.green() / 100, 2) + 0.114 * Math.pow(color.blue() / 100, 2)) * 100;
}

export function mix(hex1: string, hex2: string) {
  return Color(hex1, 'hex').mix(Color(hex2, 'hex')).hex();
}
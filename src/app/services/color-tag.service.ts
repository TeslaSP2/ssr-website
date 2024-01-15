import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import Color from 'color';
import { RandomInt } from '../interfaces/gen-methods';
import { Palette } from '../interfaces/palette';
import { RemoteJsonReaderService } from './remote-json-reader.service';

const defPalette: Palette = {tag: 'default', color: ['00968F'], secondColor: "bdb46a", defColor: "0", grad: true, gradAngle: "45", lightColor: 'ffffff', darkColor: '006e6d', secondDarkColor: '807947', invColor: '1d1d1d' };

@Injectable({
  providedIn: 'root'
})
export class ColorTagService {
  private Tags: Palette[] = [];

  constructor(@Inject(DOCUMENT) private document: Document,
  private remoteJson: RemoteJsonReaderService) {
    this.wakeUp();
  }

  wakeUp() {
    return this.remoteJson.get<Palette[]>('colorTags.json').then(data => this.Tags = data)
  }
  
  getPalette(search: string | undefined) {
    if(search != undefined)
      for(let tag of this.Tags)
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

  getColor(search: string | undefined) {
    if(search != undefined)
      for(let tag of this.Tags)
      {
        if(tag.tag == search)
          return tag.color;
      }

    return defPalette.color;
  }

  getSecondColor(search: string | undefined) {
    if(search != undefined)
      for(let tag of this.Tags)
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
                  let color = Color('#'+this.getColor(search).firstOrDefault(), "hex");

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

  getDefColor(search: string | undefined) {
    if(search != undefined)
      for(let tag of this.Tags)
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

  asGrad(search: string | undefined) {
    if(search != undefined)
      for(let tag of this.Tags)
      {
        if(tag.tag == search && tag.grad != undefined)
          return tag.grad;
      }

    return defPalette.grad!;
  }

  getGradAngle(search: string | undefined) {
    if(search != undefined)
      for(let tag of this.Tags)
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

  getLightColor(search: string | undefined) {
    if(search != undefined) {
      if(!search.includes("#"))
        for(let tag of this.Tags)
        {
          if(tag.tag == search) {
            if(tag.lightColor != undefined)
              return tag.lightColor;
            else if(tag.lightColor == undefined)
            {
              let color = Color('#'+this.getDefColor(search), "hex");
              
              if(this.getLuminance(color) > 128)
                return color.mix(Color("black"), 0.65).hex().substring(1);
              else
                return color.mix(Color("white"), 0.8).hex().substring(1);
            }
          }
        }
      else
      {
        let color = Color(search, "hex");
        
        if(this.getLuminance(color) > 128)
          return color.mix(Color("black"), 0.65).hex().substring(1);
        else
          return color.mix(Color("white"), 0.8).hex().substring(1);
      }
    }

    return defPalette.lightColor;
  }

  hasLightColor(search: string | undefined) {
    if(search == undefined)
      return false;
    
    for(let tag of this.Tags)
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

  getDarkColor(search: string | undefined) {
    if(search != undefined)
      if(!search.includes("#"))
      {
        for(let tag of this.Tags)
        {
          if(tag.tag == search) {
            if(tag.darkColor != undefined)
              return tag.darkColor;
            else if(tag.darkColor == undefined)
            {
              let color = Color('#'+this.getDefColor(search), "hex");

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

  hasDarkColor(search: string | undefined) {
    if(search == undefined)
      return false;
    
    for(let tag of this.Tags)
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

  getSecondDarkColor(color_def: string | undefined) {
    if(color_def != undefined)
      if(!color_def.includes("#"))
      {
        for(let tag of this.Tags)
        {
          if(tag.tag == color_def) {
            if(tag.secondDarkColor != undefined)
              return tag.secondDarkColor;
            else if(tag.secondDarkColor == undefined)
            {
              let color = Color('#'+this.getSecondColor(color_def), "hex");

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

  hasSecondDarkColor(search: string | undefined) {
    if(search == undefined)
      return false;
    
    for(let tag of this.Tags)
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

  getInvColor(search: string | undefined) {
    if(search != undefined)
      for(let tag of this.Tags)
      {
        if(tag.tag == search && tag.invColor != undefined) {
          return tag.invColor;
        }
      }

    return defPalette.invColor;
  }

  hasSpecialColor(search: string | undefined) {
    if(search != undefined)
      for(let tag of this.Tags)
      {
        if(tag.tag == search)
          return true;
      }

    return false;
  }

  colorConditional(tag: string) {
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
      return this.hasSpecialColor(tag) ? rasterizedColorArray(this.getColor(tag), this.getGradAngle(tag), this.asGrad(tag)) : null;
    else return null;
  }

  getLuminance(color: Color) {
    return Math.sqrt(0.299 * Math.pow(color.red() / 100, 2) + 0.587 * Math.pow(color.green() / 100, 2) + 0.114 * Math.pow(color.blue() / 100, 2)) * 100;
  }

  setTheme(search: string | undefined) {
    this.wakeUp().then(() => {
      this.document.documentElement.style.setProperty(`--theme-color`,  `#`+defPalette.color.firstOrDefault());
      this.document.documentElement.style.setProperty(`--theme-secondColor`,  `#`+defPalette.secondColor);
      this.document.documentElement.style.setProperty(`--theme-lightColor`, `#`+defPalette.lightColor);
      this.document.documentElement.style.setProperty(`--theme-darkColor`, `#`+defPalette.darkColor);
      this.document.documentElement.style.setProperty(`--theme-secondDarkColor`, `#`+defPalette.secondDarkColor);
      this.document.documentElement.style.setProperty(`--theme-invColor`, `#`+defPalette.invColor);
  
      if(search != undefined && this.hasSpecialColor(search))
      {
        let defColor = this.getDefColor(search);
        let secondColor = this.getSecondColor(search);
        let light = this.getLightColor(this.hasLightColor(search) ? search : (`#`+defColor));
        let dark = this.getDarkColor(this.hasDarkColor(search) ? search : (`#`+defColor));
        let secondDark = this.getSecondDarkColor(this.hasSecondDarkColor(search) ? search : (`#`+secondColor));
        let inv = this.getInvColor(search) == "light" ? light : (this.getInvColor(search) == "dark" ? dark : this.getInvColor(search));
    
        this.document.documentElement.style.setProperty(`--theme-color`,  `#`+defColor);
        this.document.documentElement.style.setProperty(`--theme-secondColor`,  `#`+secondColor);
        this.document.documentElement.style.setProperty(`--theme-lightColor`, `#`+light);
        this.document.documentElement.style.setProperty(`--theme-darkColor`, `#`+dark);
        this.document.documentElement.style.setProperty(`--theme-secondDarkColor`, `#`+secondDark);
        this.document.documentElement.style.setProperty(`--theme-invColor`, `#`+inv);
      }
    });
  }

  mix(hex1: string, hex2: string) {
    return Color(hex1, 'hex').mix(Color(hex2, 'hex')).hex();
  }
}

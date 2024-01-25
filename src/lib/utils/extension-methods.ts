import { ArchivePost } from "../../interfaces/ArchivePost";
import { LangKeyedString } from "../../interfaces/General";

export const MapAsync = <T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> => {
  return Promise.all(array.map(callbackfn));
}

export const RandomInt = (maxNotInclusive: number) => {
  return Math.floor(Math.random() * (maxNotInclusive));
}

export const RandomString = (length: number = 10): string => {
  const chars = "1234567890qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNMºª\\!|\"@·#$~%€&¬/()=?\'¿¡^`[*+]¨´{Çç}<>,;.:-_";
  const randomArray = Array.from (
    { 
      length: length
    },
    (v, k) => chars[RandomInt(chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
}

export const RandomSafeString = (length: number = 10): string => {
  const chars = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM@#$%&*";
  const randomArray = Array.from (
    { 
      length: length
    },
    (v, k) => chars[RandomInt(chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
}

export const RandomHexColor = (): string => {
  const chars = "0123456789ABCDEF";
  const randomArray = Array.from (
      { 
      length: 6
      },
      (v, k) => chars[RandomInt(chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
}

export const SadFace = () => {
  const chars = [":c",":(","😢","😭","😿","🙍‍♀️","🙍‍♂️","🥀",":-(",":[","):","T_T",";_;","=[","=(","/_ \\","＞﹏＜","(っ °Д °;)っ","ಥ_ಥ","＞︿＜","இ","╯︿╰","〒▽〒","(╯°□°）╯︵ ┻━┻"];
  const randomArray = Array.from (
  { 
      length: 1
  },
  (v, k) => chars[RandomInt(chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
}

export const Interpreter = (from: LangKeyedString[] | undefined, currentLang: string, showNsfw: boolean = false) => {
  if(from == undefined)
  {
    return {stuff: [""]}
  }

  let curr = from.filter(f => f.key == currentLang).firstOrDefault();
  let def = from.filter(f => f.key == "def").firstOrDefault();

  if(def == null)
    def = from.filter(f => f.key == "en").firstOrDefault();

  if(curr != null)
  {
    let temp: string[] = []
    for(const s of curr.stuff.filter(s => showNsfw ? s.onlySfw != true : s.nsfw != true))
      temp.push(s.str);
    return {stuff: temp};
  }
  
  if(def != null)
  {
    let temp: string[] = []
    for(const s of def.stuff.filter(s => showNsfw ? s.onlySfw != true : s.nsfw != true))
      temp.push(s.str);
    return {stuff: temp};
  }

  return {stuff: [""]};
}

type Alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
export const CaesarCipher = (string: string, shift: number) => {
  // Alphabet
  const alphabet: Alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

  // Encoded Text
  let encodedText: string = '';

  // Adjust Shift (Over 26 Characters)
  if (shift > alphabet.length) {
    // Assign Remainder As Shift
    shift = shift % alphabet.length;
  }

  // Iterate Over Data
  let i: number = 0;
  while (i < string.length) {
    // Valid Alphabet Characters
    if (alphabet.indexOf(string[i]) !== -1) {
      // Find Alphabet Index
      const alphabetIndex: number = alphabet.indexOf((string[i]).toUpperCase());

      // Alphabet Index Is In Alphabet Range
      if (alphabet[alphabetIndex + shift]) {
        // Append To String
        encodedText += alphabet[alphabetIndex + shift];
      }
      // Alphabet Index Out Of Range (Adjust Alphabet By 26 Characters)
      else {
        // Append To String
        encodedText += alphabet[alphabetIndex + shift - alphabet.length];
      }
    }
    // Special Characters
    else {
      // Append To String
      encodedText += string[i];
    }

    // Increase I
    i++;
  }

  return encodedText;
};

declare global {  
  interface Date {    
    sameDate(as: Date): boolean;
    sameTime(as: Date): boolean;
  }

  interface Array<T> {
    search(terms: string[] | undefined, currentLang: string | undefined) : Array<T>;
    getTags(): Array<T> | undefined;
    firstOrDefault(): T;
    lastOrDefault(): T;
    exclude(...no: Array<T>): Array<T>;
    removeAt(index: number): Array<T>;
    rasterize(): string;
    limit(cap: number): Array<T>;
    limit(cap: number, inv: boolean): Array<T>;
    anyLike(search: T): boolean;
    filterAsync<T>(callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T[]>
    atPositions(indexes?: number[]): Array<T>;
  }

  interface String {
    cut(length: number): string;
    reverse(): string;
    toFirstUpperCase(): string;
    toDate(): Date;
    toDate(dateType: "y-m-d" | "d-m-y", invariant?: boolean): Date;
    checkForUnlock(): boolean;
    caesarCipher(): string;
    caesarCipher(despl: number): string;
    translateEmojis(): {text: string, isEmoji: boolean}[];
  }

  interface Number {
    msToYDHMS(): string;
    showLeft(total: number): string;
    roundTo(round: number): number;
    toMeasure(measure: string): string;
  }
}

Date.prototype.sameDate = function (as: Date): boolean {
  let isDaySame = this.getDate() == as.getDate();
  let isMonthSame = this.getMonth() == as.getMonth();
  let isYearSame = this.getFullYear() == as.getFullYear();

  return isDaySame && isMonthSame && isYearSame;
}

Date.prototype.sameTime = function (as: Date): boolean {
  let isHoursSame = this.getHours() == as.getHours();
  let isMinutesSame = this.getMinutes() == as.getMinutes();
  let isSecondsSame = this.getSeconds() == as.getSeconds();

  return isHoursSame && isMinutesSame && isSecondsSame;
}

Array.prototype.filterAsync = async function <T>(callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T[]> {
  const filterMap = await MapAsync(this, callbackfn);
  return this.filter((value, index) => filterMap[index]);
}

Array.prototype.search = function (this: ArchivePost[], terms: string[] | undefined, currentLang: string | undefined): ArchivePost[] {
  let temp = this;

  if(terms != undefined)
  {
    for(const term of terms) {
      temp = temp.filter(p => {
        let not = term.startsWith("-");
        let modTerm = not ? term.substring(1).toLowerCase() : term;

        if(modTerm == "")
          return true;
          
        let isCommand = modTerm.includes(':') ? modTerm.split(':') : [];
        let command = isCommand.length > 0 ? isCommand[0] : "";
        let finalTerm = isCommand.length > 0 ? isCommand[1] : modTerm;

        let wildcard = "";
        if(finalTerm.startsWith('*') && finalTerm.endsWith('*'))
        {
          wildcard = "has";
          finalTerm = finalTerm.substring(1, finalTerm.length -1).toLowerCase();
        }
        else if(finalTerm.startsWith('*'))
        {
          wildcard = "end";
          finalTerm = finalTerm.substring(1).toLowerCase();
        }
        else if(finalTerm.endsWith('*'))
        {
          wildcard = "start";
          finalTerm = finalTerm.substring(0, finalTerm.length -1).toLowerCase();
        }

        if(finalTerm == "")
          return true;

        let includes = true;
        let starts = true;
        let ends = true;

        switch(command) {
          case 'c':
            {
              let cat = finalTerm;
              let isNSFW = false;
              let isCringe = false;
              let isScrapped = false;
              let isMusical = false;
              isNSFW = "nsfw" == cat || "🔞" == cat ? p.nsfw??false : true;
              isCringe = "cringe" == cat || "🤢" == cat ? p.cringe??false : true;
              isScrapped = "scrapped" == cat || "🗑️" == cat ? p.scrapped??false : true;
              isMusical = "musical" == cat || "🎶" == cat ? p.musical??false : true;
              
              if(!not)
                return isNSFW && isCringe && isScrapped && isMusical;
              else
                return !(isNSFW && isCringe && isScrapped && isMusical);
            }
          case 't':
            {
              if(p.tags == undefined)
                return false;
              
              let tag = finalTerm.replace("_", " ");

              includes = p.tags.filter(t => t.toLowerCase().includes(tag)).length > 0;
              starts = p.tags.filter(t => t.toLowerCase().startsWith(tag)).length > 0;
              ends = p.tags.filter(t => t.toLowerCase().endsWith(tag)).length > 0;
              break;
            }
          case 'y':
            {
              let year = finalTerm;
              let postYear = p.unlockDate.toDate().getFullYear()+"";

              includes = postYear.includes(year);
              starts = postYear.startsWith(year);
              ends = postYear.endsWith(year);
              break;
            }
          case 'date':
            {
              let date = finalTerm;
                
              let parsedSearchDate = date.toDate();
              let parsedPostDate = p.unlockDate.toDate();          
  
              if(!not)
                return parsedPostDate.sameDate(parsedSearchDate);
              else
                return !parsedPostDate.sameDate(parsedSearchDate);
            }
          case 'time':
            {
              let time = finalTerm;
                
              let parsedSearchDate = time.toDate();
              let parsedPostDate = p.unlockDate.toDate();            
  
              if(!not)
                return parsedPostDate.sameTime(parsedSearchDate);
              else
                return !parsedPostDate.sameTime(parsedSearchDate);
            }
          case 'datetime':
            {
              let dateTime = finalTerm.replace("T", " ");
                
              let parsedSearchDate = dateTime.toDate();
              let parsedPostDate = p.unlockDate.toDate();            
  
              if(!not)
                return parsedPostDate == parsedSearchDate;
              else
                return parsedPostDate != parsedSearchDate;
            }
          case 'iname':
            {
              includes = p.jsonName.toLowerCase().includes(finalTerm.toLowerCase());
              starts = p.jsonName.toLowerCase().startsWith(finalTerm.toLowerCase());
              ends = p.jsonName.toLowerCase().endsWith(finalTerm.toLowerCase());
              break;
            }
          case 'id':
            {
              includes = p.id.toLowerCase().includes(finalTerm.toLowerCase());
              starts = p.id.toLowerCase().startsWith(finalTerm.toLowerCase());
              ends = p.id.toLowerCase().endsWith(finalTerm.toLowerCase());
              break;
            }
          case '🔑':
            {
              if(finalTerm == "show")
              {
                includes = true;
                starts = true;
                ends = true;
              }
              else if (finalTerm == "exclusive")
              {
                includes = p.unlisted == true;
                starts = p.unlisted == true;
                ends = p.unlisted == true;
              }
              break;
            }
          default:
            {
              let name = "";
              let titleLine = p.linkPart.filter(h => h.key == currentLang || (h.key != currentLang && h.key == "def")).firstOrDefault();
              name = titleLine != null ? titleLine.str : p.linkPart[0].str;

              includes = name.toLowerCase().includes(finalTerm.toLowerCase());
              starts = name.toLowerCase().startsWith(finalTerm.toLowerCase());
              ends = name.toLowerCase().endsWith(finalTerm.toLowerCase());
            }
          }

          if(wildcard == "start")
          {
            if(!not)
              return includes && starts && !ends;
            else
              return includes && !starts && ends;
          }
          else if(wildcard == "end")
          {
            if(!not)
              return includes && !starts && ends;
            else
              return includes && starts && !ends;
          }
          else if(wildcard == "has")
          {
            if(!not)
              return includes && !starts && !ends;
            else
              return !includes && starts && ends;
          }
          else
          {
            if(!not)
              return includes;
            else
              return !includes;
          }
        }
      );  
    }
  }

  return temp;
}

Array.prototype.getTags = function (this: string[]): string[] | undefined {
  let rawTags = this.filter(t => t.includes(":"));

  let tags: string[] = [];

  for (const rawTag of rawTags) {
    let tag = rawTag.slice(rawTag.indexOf(":")+1);
    tag = tag == '🔞' ? 'nsfw' : tag;
    tag = tag == '🤢' ? 'cringe' : tag;
    tag = tag == '🗑️' ? 'scrapped' : tag;
    tag = tag == '🎶' ? 'musical' : tag;
    
    if(rawTag[0] != '-' && tag != '')
      tags.push(tag.replace("_"," "));
  }

  if(tags.length > 0)
    return tags;
  else
    return undefined;
}

Array.prototype.firstOrDefault = function<T>(this: Array<T>): T | null {
  return this[0] != undefined ? this[0] : null;
}

Array.prototype.lastOrDefault = function<T>(this: Array<T>): T | null {
  return this[this.length-1] != undefined ? this[this.length-1] : null;
}

Array.prototype.exclude = function<T>(this: Array<T>, ...no: Array<T>): Array<T> {
  let ret: Array<T> = [];
  
  for(const ex of this)
  {    
    if(!no.includes(ex) && !ret.includes(ex))
      ret.push(ex);
  }

  return ret;
} 

Array.prototype.removeAt = function<T>(this: Array<T>, index: number): Array<T> {
  let ret: Array<T> = [];

  for(let i = 0; i < this.length; i++)
    if(i != index)
      ret.push(this[i]);

  return ret;
}

Array.prototype.rasterize = function(this: string[]): string {
  let ret = "";
  for(let i = 0; i < this.length; i++)
  {
    const str = this[i];
    ret += str+(i < this.length-1 ? "\n" : "");
  }
  return ret;
}

Array.prototype.limit = function<T>(this: Array<T>, cap: number, inv: boolean = false): Array<T> {
  if(cap == 0)
  {
    return this;
  }

  let temp: Array<T> = [];
  const actualCap = cap >= this.length ? this.length : cap;

  if(!inv)
    for(let i = 0; i < actualCap; i++)
    {
      temp.push(this[i]);
    }
  else
    for(let i = actualCap-1; i >= 0 ; i--)
    {
      temp.push(this[i]);
    }
  return temp;
}

Array.prototype.anyLike = function(this: string[], search: string): boolean {
  let hasSearch = false;

  for(const str of this)
  {
    if(str.includes(search))
    {
      hasSearch = true;
      break;
    }
  }

  return hasSearch;
}

Array.prototype.atPositions = function<T>(this: Array<T>, indexes?: number[]): Array<T> {
  if(indexes != undefined)
  {
    let ret: Array<T> = [];
    for(const i of indexes)
      ret.push(this[i] != undefined ? this[i] : this.lastOrDefault())
  
    return ret;
  }

  return this;
}

String.prototype.cut = function(this: string, length: number): string {
  let ret = "";

  if(this.length > length)
    ret = this.substring(0, length >=3 ? length-3 : length) + "...";
  else
    ret = this;

  return ret;
}

String.prototype.reverse = function(this: string): string {
  let ret = "";
  for(let i = this.length-1; i >= 0; i--)
  {
    ret = ret+this[i];
  }
  
  return ret;
}

String.prototype.toFirstUpperCase = function(this: string): string {
  let ret = "";
  for(let i = 0; i < this.length; i++)
    ret += i == 0 ? this[i].toUpperCase() : this[i];
  
  return ret;
}

String.prototype.toDate = function(this:string): Date {
  return this.toDate('y-m-d');
}

String.prototype.toDate = function(this:string, dateType: "y-m-d" | "d-m-y" = "y-m-d", invariant:boolean = false): Date {
  let [dateComponents, timeComponents] = ["",""];
  
  if(this.split(' ').length == 2)
    [dateComponents, timeComponents] = this.split(' ');
  else
  {
    if(this.includes('/'))
      dateComponents = this;
    else if(this.includes(':'))
      timeComponents = this;
  }

  let [year, month, day] : [string|number, string|number, string|number] = [2014,1,1]
  let [hours, minutes, seconds] : [string|number, string|number, string|number] = [0,0,0];
  
  if(dateComponents != undefined) {
    switch(dateType)
    {
      case "y-m-d": 
      {
        [year, month, day] = dateComponents.split('/');
        break;
      }
      case "d-m-y": 
      {
        [day, month, year] = dateComponents.split('/');
        break;
      }
    }
  }

  if(timeComponents != undefined) [hours, minutes, seconds] = timeComponents.split(':');
  const tYear = (year == undefined ? 2014 : +year);
  const tMonth = (month == undefined ? 0 : +month);
  const tDay = (day == undefined ? 1 : +day);
  const tHours = (hours == undefined ? 0 : +hours);
  const tMinutes = (minutes == undefined ? 0 : +minutes);
  const tSeconds = (seconds == undefined ? 0 : +seconds);
  const dateString = tYear+"-"+tMonth.showLeft(2)+"-"+tDay.showLeft(2)+"T"+tHours.showLeft(2)+":"+tMinutes.showLeft(2)+":"+tSeconds.showLeft(2)+(!invariant ? "+01:00" : '');
  const unlockDate = new Date(dateString);
  
  return unlockDate;
}

String.prototype.checkForUnlock = function(this:string): boolean {
  if(this != "")
  {
    const unlockDate = this.toDate("y-m-d");
    if(unlockDate.getTime() <= new Date().getTime())
      return true;

    return false;
  }
  return false;
}

String.prototype.caesarCipher = function(this: string): string {
  const chars = "0123456789";
  const randomArray = Array.from (
    { 
      length: RandomInt(100)
    },
    (v, k) => chars[RandomInt(chars.length)]
  );

  const randomString = randomArray.join("");
  return this.caesarCipher(+randomString);
}

String.prototype.caesarCipher = function(this: string, despl: number = 0): string {
  return CaesarCipher(this.toUpperCase(), despl);
}

String.prototype.translateEmojis = function(this: string): {text: string, isEmoji: boolean}[] {
  let ret: {text: string, isEmoji: boolean}[] = [];

  for(const word of this.split(' '))
  {
    let emoji = /\p{Emoji_Presentation}/gu.test(word);
    if(!emoji)
    {
      if(word.startsWith("·") && word.endsWith("·"))
        ret.push({text: word, isEmoji: true});
      else
        ret.push({text: word, isEmoji: emoji});
    }
    else
    {
      for(const char of word)
      {
        ret.push({text: char.codePointAt(0)+"", isEmoji: emoji});
      }
    }
  }

  return ret;
}

Number.prototype.msToYDHMS = function(this: number): string
{
  let cs = 1000,
      cm = 60 * cs,
      ch = 60 * cm,
      cd = 24 * ch,
      cy = 365.25 * cd,
      y = Math.floor(this / cy),
      d = Math.floor((this - y * cy) / cd),
      h = Math.floor((this - y * cy - d * cd) / ch),
      m = Math.floor((this - y * cy - d * cd - h * ch) / cm),
      s = Math.round((this - y * cy - d * cd - h * ch - m * cm) / cs),
      pad = function(n: number){ return n < 10 ? '0' + n : n; };
  if(s === 60) {
    m++;
    s = 0;
  }
  if(m === 60) {
    h++;
    m = 0;
  }
  if(h === 24) {
    d++;
    h = 0;
  }
  if(d === 365.25) {
    y++;
    d = 0;
  }

  return [y, d, pad(h), pad(m), pad(s)].join(":");
}

Number.prototype.showLeft = function(this:number, total: number): string {
  let ret = this.toString();
  for(let i = 0; i < total; i++)
  {
    if(ret.length < total)
      ret = '0'+ret;
    else
      break;
  }

  return ret;
}

Number.prototype.roundTo = function(this:number, round:number): number {
  return (+(Math.round(+(this + ("e+"+round)))  + ("e-"+round)))
}

Number.prototype.toMeasure = function(this:number, measure:string): string {
  if(this < 0)
  return "idk";

switch (measure) {
  case 'cm':
    return this.roundTo(2)+"cm";
  case 'in':
    return (this * 0.3937).roundTo(2)+"in";
  case 'm':
    return (this / 100).roundTo(2)+"m";
  case 'ft':
    {
      let feet = this / 30.48;
      let whole_feet = Math.floor(feet);
      let inches = (feet - whole_feet) * 12;
      return whole_feet+"ft "+inches.roundTo(2)+"'";
    }
  case 'kg':
    return this.roundTo(2)+"kg";
  case 'lbs':
    return (this*2.2).roundTo(2)+" lbs";
  case "hmb":
    return (this*35.273962).roundTo(2)+" hamburgers";
  case "m/s":
    return (this).roundTo(2)+" m/s";
  case "ft/s":
    return (this*3.280839895).roundTo(2)+" ft/s";
  case "km/h":
    return (this*18/5).roundTo(2)+" km/h";
  case "mph":
    return (this*2.2369).roundTo(2)+" mph";
  case "EUR":
    return (this).roundTo(2)+" €"
  case "USD":
    return (this*1.09).roundTo(2)+" $"
  case "GBP":
    return (this*0.86).roundTo(2)+" £"
  case "JPY":
    return (this*157.96).roundTo(2)+" ¥"
  default:
    return 'idk';
}
}

export {};
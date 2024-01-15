import { LangKeyedString, OutLink } from "./general";

export interface SocialExt {
    social: OutLink;
    text: LangKeyedString[];
    active?: boolean;
    use?: boolean;
    inactive?: boolean;
    extra?: boolean;
  }

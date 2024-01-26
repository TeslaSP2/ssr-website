import { LangKeyedString, OutLink } from "./General";

export interface SocialExt {
    social: OutLink;
    text: LangKeyedString[];
    active?: boolean;
    use?: boolean;
    inactive?: boolean;
    extra?: boolean;
  }
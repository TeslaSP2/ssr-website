import { LangKeyedString } from "../../../interfaces/General";

export async function fetchChat(chatJson: string) {
    return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/chats/${chatJson}.json`)).json()) as Chat);
}

export interface Chat {
    chatName: string;
    chatIcon: string;
    chatLines: TextLine[];
  }
  
  export interface TextLine {
    line: LangKeyedString[];
    position: "sender" | "recipient";
    showName: boolean;
    name: string;
  }
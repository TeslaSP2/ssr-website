import { LangKeyedString } from "../../../interfaces/General";
import { readAsObject } from "../../utils/Dependency";

export async function fetchChat(chatJson: string) {
    return await readAsObject<Chat>(`chats/${chatJson}.json`);
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
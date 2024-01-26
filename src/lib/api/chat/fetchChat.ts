import { LangKeyedString } from "../../../interfaces/General";
import { read } from "../../utils/Dependency";

export async function fetchChat(chatJson: string) {
    return await read<Chat>(`chats/${chatJson}.json`);
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
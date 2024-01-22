import { ArchivePost } from "../interfaces/General";
import { RandomInt } from "./gen-methods";

export async function fetchPost(id: string) {
    let apRef = ((await (await fetch('https://files.teslasp2.com/assets/jsons/'+`archive-posts.json?${RandomInt(99999999999)}`)).json()) as ArchivePost[]).filter(p => p.id == id).firstOrDefault();
    if(apRef == null)
    {
      return {id: id, name: "", description: "", featuredImage: "https://files.teslasp2.com/assets/imgs/404.png"}
    }

    let postRef = (await (await fetch('https://files.teslasp2.com/assets/jsons/'+"posts/"+apRef.unlockDate.toDate().getFullYear()+"/"+apRef.jsonName+".json?"+RandomInt(99999999999))).json()) as Post;

}
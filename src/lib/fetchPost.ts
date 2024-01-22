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



public async APIReturn(id: string) {
    let apRef = ((await (await fetch('https://files.teslasp2.com/assets/jsons/'+`archive-posts.json?${RandomInt(99999999999)}`)).json()) as ArchivePost[]).filter(p => p.id == id).firstOrDefault();
    if(apRef == null)
    {
      return {id: id, name: "", description: "", featuredImage: "https://files.teslasp2.com/assets/imgs/404.png"}
    }

    let postRef = (await (await fetch('https://files.teslasp2.com/assets/jsons/'+"posts/"+apRef.unlockDate.toDate().getFullYear()+"/"+apRef.jsonName+".json?"+RandomInt(99999999999))).json()) as Post;

    if(postRef == null)
    {
      return {id: id, name: "", description: "", featuredImage: "https://files.teslasp2.com/assets/imgs/404.png"}
    }

    let titleLine = apRef.linkPart.filter(h => h.key == "en" || (h.key != "en" && h.key == "def")).firstOrDefault();
    let title = titleLine != null ? titleLine.str : apRef.linkPart[0].str;
    let firstLine = Interpreter(postRef.body.filter(b => b.type == 'p').firstOrDefault().content, "en").stuff.firstOrDefault();

    let fs = await this.postService.getFeaturedStuffFromPost(apRef, "en");

    return {id: id, name: title, description: firstLine, featuredImage: fs.censImage != undefined ? fs.censImage : fs.image}
  }
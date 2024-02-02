import { Post } from "../../../interfaces/Post";
import { readAsObject } from "../../utils/Dependency";

export async function fetchPost(year: string, name: string){
    return await readAsObject<Post>(`posts/${year}/${name}.json`);
}
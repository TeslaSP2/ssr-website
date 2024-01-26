import { Post } from "../../../interfaces/Post";
import { read } from "../../utils/Dependency";

export async function fetchPost(year: string, name: string){
    return read<Post>(`posts/${year}/${name}.json`);
}
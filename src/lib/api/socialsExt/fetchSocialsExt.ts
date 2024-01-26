import { SocialExt } from "../../../interfaces/SocialExt";
import { read } from "../../utils/Dependency";

export async function fetchSocialsExt() {
    return await read<SocialExt[]>('socials-ext.json');
}
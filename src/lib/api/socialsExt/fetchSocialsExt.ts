import { SocialExt } from "../../../interfaces/SocialExt";
import { readAsObject } from "../../utils/Dependency";

export async function fetchSocialsExt() {
    return await readAsObject<SocialExt[]>('socials-ext.json');
}
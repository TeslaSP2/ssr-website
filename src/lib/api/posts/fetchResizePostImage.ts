import { randomUUID } from "crypto";
import sharp from "sharp";
import { del, read } from "../../utils/Dependency";

export async function fetchResizeImage(path: string, size: number = 0) {
    let realPath = '../files/'+path.replaceAll('|', '/');
    let tempPath = `./${randomUUID()}.webp`;
    let readF = await read(realPath);
    let image = sharp(readF);
    let b64 ='';
    let imageMetadata = await image.metadata();
    if(imageMetadata.width != undefined && imageMetadata.height != undefined)
    {
        if(imageMetadata.width == imageMetadata.height)
        {
            if(imageMetadata.width > size)
                await image.resize(size,size,{fit: 'contain'}).webp().toFile(tempPath);
            else
                await image.webp().toFile(tempPath);
        }
        else if(imageMetadata.width > imageMetadata.height)
        {
            let smSize = Math.round(imageMetadata.height * size / imageMetadata.width);
            if(imageMetadata.width > size)
                await image.resize(size,smSize,{fit: 'contain'}).webp().toFile(tempPath);
            else
                await image.webp().toFile(tempPath);
        }
        else if(imageMetadata.width < imageMetadata.height)
        {
            let smSize = Math.round(imageMetadata.width * size / imageMetadata.height);
            if(imageMetadata.height > size)
                await image.resize(smSize,size,{fit: 'contain'}).webp().toFile(tempPath);
            else
                await image.webp().toFile(tempPath);
        }
        b64 = 'data:image/webp;base64,'+await read(tempPath, 'base64');
        await del(tempPath);
    }
    
    return {base64: b64};
}
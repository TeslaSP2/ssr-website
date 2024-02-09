import { randomUUID } from "crypto";
import sharp from "sharp";
import { del, read } from "../../utils/Dependency";

export async function fetchResizeImage(path: string, size: number = 0) {
    let realPath = '../files/'+path.replaceAll('|', '/');
    let tempPath = `./${randomUUID()}.webp`;
    let readF = await read(realPath);
    let image = sharp(readF, {animated: true, pages: -1});
    let b64 ='';
    let imageMetadata = await image.metadata();

    const { width: realWidth, height: heightAllPages, pages, pageHeight } = imageMetadata;
    const imageHeight = pageHeight || ((heightAllPages??1) / (pages??1)) // pageHeight usually only exists for gif, not webp
    const imageWidth = realWidth??1;

    let width = 1024, height = 1024;
    let touch = false;

    if(imageWidth != undefined && imageHeight != undefined)
    {
        if(imageWidth == imageHeight)
        {
            if(imageWidth > size && imageHeight > size)
            {
                width = size;
                height = size;
                touch = true;
            }
        }
        else if(imageWidth > imageHeight)
        {
            if(imageWidth > size)
            {
                height = Math.round(imageHeight * size / imageWidth);
                width = size;
                touch = true;
            }
        }
        else if(imageWidth < imageHeight)
        {
            if(imageHeight > size)
            {
                height = size;
                width = Math.round(imageWidth * size / imageHeight);
                touch = true;
            }
        }

        if(!touch)
            await image.webp().toFile(tempPath);
        else
            await image.resize(width,height,{fit: 'contain'}).webp().toFile(tempPath);

        b64 = 'data:image/webp;base64,'+await read(tempPath, 'base64');

        await del(tempPath);
    }
    
    return {base64: b64};
}
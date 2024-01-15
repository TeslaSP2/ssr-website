import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TranslateCustomService {

  constructor(private titleService:Title, private meta: Meta) { }

  change(name: string, route: string, desc:string, img: string = ""): void {
    if(img == "")
    {
      img = "https://files.teslasp2.com/assets/imgs/oc-bios/alis/alisThumb.webp";
    }
    this.titleService.setTitle(name);
    //this.meta.updateTag({ httpEquiv: 'refresh', content: ('3; url = https://teslasp2.com'+route) });
    this.meta.updateTag({ property: 'description', content: (desc) });
    this.meta.updateTag({ property: 'og:url', content: ('https://teslasp2.com'+route) });
    this.meta.updateTag({ property: 'twitter:url', content: ('https://teslasp2.com'+route) });
    this.meta.updateTag({ property: 'og:image', content: (img) });
    this.meta.updateTag({ name: 'twitter:image', content: (img) });
    this.meta.updateTag({ property: 'og:title', content: (name) });
    this.meta.updateTag({ name: 'twitter:title', content: (name) });
    this.meta.updateTag({ property: 'og:description', content: (desc) });
    this.meta.updateTag({ name: 'twitter:description', content: (desc) });
  }
}

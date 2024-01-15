import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArchiveService } from '../../services/archive.service';
import { PostService } from '../../services/post.service';
import { TranslateCustomService } from '../../services/translate-custom.service';
import { Interpreter } from '../../interfaces/gen-methods';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  private id: string = '';

  private subParamsId;
  private year: string = "";
  private postName: string = "";

  title: string = '';
  firstLine: string = '';
  featuredImage: string = '';


  constructor(private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private archiveService: ArchiveService,
    private titleService: TranslateCustomService) {
    this.subParamsId = this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id1') !== null)
      {
        this.id = params.get('id1')+"";

        this.archiveService.getPostAsync(this.id).then((archRef) => {
          this.postName = archRef.jsonName;
          this.year = this.archiveService.getPostYear(this.id)+"";

          this.postService.getPost(this.year, this.postName).then(post => {
            let lang = params.get('id2') != null ? params.get('id2')+"" : "en";
            this.postService.getFeaturedStuffFromPost(archRef, lang, true).then(featuredStuff => {
              this.featuredImage = featuredStuff.censImage != undefined ? featuredStuff.censImage : featuredStuff.image;
              let titleLine = archRef.linkPart.filter(h => h.key == lang || (h.key != lang && h.key == "def")).firstOrDefault();
              this.title = titleLine != null ? titleLine.str : archRef.linkPart[0].str;
  
              this.firstLine = Interpreter(post.body.filter(b => b.type == 'p').firstOrDefault().content, lang).stuff.firstOrDefault();

              this.titleService.change(this.title, '/archive/post/'+this.id, this.firstLine, this.featuredImage);
            });
          });
        });
      }
    })
  }
}

import { Hono } from 'hono'
import { getCollection, getOc, getPost, getTag, getTagOrCollection } from './routes/embed/EmbedRoutes';
import { getEmojis } from './routes/utils/getEmojis';
import { getAbosFiles, getAbosTable } from './routes/api/AbosRoutes';
import { getAmeDiary, getAmeFiles } from './routes/api/AmeRoutes';
import { getAllAnnouncements, getAnnouncement, getAnnouncements } from './routes/api/AnnouncementsRoutes';
import { getArchive, getArchiveLastPosts, getArchivePost } from './routes/api/ArchiveRoutes';
import { getChangelog, getChangelogs } from './routes/api/ChangelogsRoutes';
import { getChat } from './routes/api/ChatRoutes';

const app = new Hono()

app.get('/', async (c) => {
  return c.redirect('https://teslasp2.com')
})

//#region For the Embeds
app.get("/p/:post", getPost);
app.get("/archive/post/:post", getPost);

app.get("/oc/:cat/:char", getOc);
app.get("/oc-bios/:cat/:char", getOc);

app.get("/c/:collection", getCollection);

app.get("/t/:tag", getTag);

app.get("/archive/:tagCol", getTagOrCollection);
//#endregion For the Embeds

app.get("/emojis", getEmojis);

//#region API
app.get("/api/abos/files", getAbosFiles);
app.get("/api/abos/table/:id", getAbosTable);

app.get("/api/ame/files", getAmeFiles);
app.get("/api/ame/diary", getAmeDiary);

app.get("/api/announcements/all", getAllAnnouncements);
app.get("/api/announcements", getAnnouncements);
app.get("/api/announcement/:id", getAnnouncement);

app.get("/api/archive", getArchive);
app.get("/api/archive/post/:id", getArchivePost);
app.get("/api/archive/last/:x/posts", getArchiveLastPosts);

app.get("/api/changelogs", getChangelogs);
app.get("/api/changelog/:id", getChangelog);

app.get("/api/chat/:id", getChat);

app.get("/api/collections");
app.get("/api/collection/:id");

app.get("/api/colors");

app.get("/api/compareSorts");

app.get("/api/iEmojis");
app.get("/api/iEmoji/:shortCode");

app.get("/api/links");

app.get("/api/music");

app.get("/api/nat/files");

app.get("/api/ocBios/chars/all");
app.get("/api/ocBios/chars/faq");
app.get("/api/ocBios");
app.get("/api/ocBio/outfits/categories/:set/:route");
app.get("/api/ocBio/outfits/:set/:route");
app.get("/api/ocBio/otherArtists/:set/:route");
app.get("/api/ocBio/char/:bio/:source/:oc?");
app.get("/api/ocBio/:route/:parent?");

app.get("/api/post/:year/:name");

app.get("/api/prices/:table");

app.get("/api/qna/MainAnswerer/:main/:parent?");
app.get("/api/qna/:id?");

app.get("/api/socialsExt");

app.get("/api/tags");
app.get("/api/tags/codes");
app.get("/api/tags/bios");
app.get("/api/tag/:tag");
//#endregion API

export default app

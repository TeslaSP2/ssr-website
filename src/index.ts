import { Hono } from 'hono'
import { getCollection, getOc, getPost, getTag, getTagOrCollection } from './routes/EmbedRoutes';
import { getEmojis } from './routes/getEmojis';

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
app.get("/api/abos/files");
app.get("/api/abos/table/:id");

app.get("/api/ame/files");

app.get("/api/announcements");
app.get("/api/announcements/all");
app.get("/api/announcement/:id");
app.get("/api/announcement/date/:id");

app.get("/api/archive");

app.get("/api/changelogs");
app.get("/api/changelog/:id");

app.get("/api/chat/:id");

app.get("/api/collections");
app.get("/api/collection/:id");

app.get("/api/colors");


//#endregion API

export default app

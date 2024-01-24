import { Hono } from 'hono'
import { getPost } from './routes/getPost';
import { getPostLang } from './routes/getPostLang';
import { getCollection } from './routes/getCollection';
import { getCollectionLang } from './routes/getCollectionLang';
import { getTag } from './routes/getTag';
import { getTagLang } from './routes/getTagLang';
import { getOc } from './routes/getOc';
import { getOcLang } from './routes/getOcLang';
import { getTagOrCollection } from './routes/getTagOrCollection';
import { getTagOrCollectionLang } from './routes/getTagOrCollectionLang';
import { getEmojis } from './routes/getEmojis';

const app = new Hono()

app.get('/', async (c) => {
  return c.redirect('https://teslasp2.com')
})

//#region Posts
app.get("/p/:post", getPost);
app.get("/archive/post/:post", getPost);

app.get("/p/:post/:lang", getPostLang);
app.get("/archive/post/:post/:lang", getPostLang);
//#endregion Posts

//#region OCs
app.get("/oc/:cat/:char", getOc);
app.get("/oc-bios/:cat/:char", getOc);

app.get("/oc/:cat/:char/:lang", getOcLang);
app.get("/oc-bios/:cat/:char/:lang", getOcLang);
//#endregion OCs

//#region Collections
app.get("/c/:collection", getCollection);
app.get("/c/:collection/:lang", getCollectionLang);
//#endregion Collections

//#region Tags
app.get("/t/:tag", getTag);
app.get("/t/:tag/:lang", getTagLang);
//#endregion Tags

//#region Col or Tag
app.get("/archive/:tagCol", getTagOrCollection);
app.get("/archive/:tagCol/:lang", getTagOrCollectionLang);
//#endregion Col or Tag

app.get("/emojis", getEmojis);

export default app

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

export default app

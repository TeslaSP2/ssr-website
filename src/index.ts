import { Hono } from 'hono'
import { getPost } from './routes/getPost';
import { getPostLang } from './routes/getPostLang';
import { getCollection } from './routes/getCollection';
import { getCollectionLang } from './routes/getCollectionLang';
import { getTag } from './routes/getTag';
import { getTagLang } from './routes/getTagLang';

const app = new Hono()

app.get('/', async (c) => {
  return c.redirect('http://teslasp2.com')
})

app.get("/p/:post", getPost);
app.get("/p/:post/:lang", getPostLang);

app.get("/c/:collection", getCollection);
app.get("/c/:collection/:lang", getCollectionLang);

app.get("/t/:tag", getTag);
app.get("/t/:tag/lang", getTagLang);

export default app

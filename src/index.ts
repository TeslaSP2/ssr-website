import { Hono } from 'hono'
import { getPost } from './routes/getPost';
import { getPostLang } from './routes/getPostLang';
import { getCollection } from './routes/getCollection';
import { getCollectionLang } from './routes/getCollectionLang';

const app = new Hono()

app.get('/', async (c) => {
  return c.redirect('http://teslasp2.com')
})

app.get("/p/:post", getPost);
app.get("/p/:post/:lang", getPostLang);

app.get("/c/:collection", getCollection);
app.get("/c/:collection/:lang", getCollectionLang);

app.get("/t/:tag");
app.get("/t/:tag/lang");

export default app

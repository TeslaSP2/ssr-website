import { Hono } from 'hono'
import { getPost } from './routes/getPost';
import { getPostLang } from './routes/getPostLang';

const app = new Hono()

app.get('/', async (c) => {
  return c.redirect('http://teslasp2.com')
})

app.get("/post/:post", getPost);
app.get("/post/:post/:lang", getPostLang);

export default app

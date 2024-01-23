import { Hono } from 'hono'
import { getPost } from './routes/getPost';

const app = new Hono()

app.get('/', async (c) => {
  return c.redirect('http://teslasp2.com')
})

app.get("/post/:post", getPost);

export default app

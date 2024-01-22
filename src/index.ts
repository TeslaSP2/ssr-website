import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
  return c.redirect('http://teslasp2.com')
})

app.get("/post/:post", async (c) => {
  return c.text(c.req.param().post);
});

export default app

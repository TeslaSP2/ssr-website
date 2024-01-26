import { Hono } from 'hono'
import { serve } from '@hono/node-server'

import { getCollectionEmbed, getOcEmbed, getPostEmbed, getTagEmbed, getTagOrCollectionEmbed } from './routes/embed/EmbedRoutes';
import { getEmojisTable } from './routes/utils/getEmojis';
import { getAbosFiles, getAbosTable } from './routes/api/AbosRoutes';
import { getAmeDiary, getAmeFiles } from './routes/api/AmeRoutes';
import { getAllAnnouncements, getAnnouncement, getAnnouncements } from './routes/api/AnnouncementsRoutes';
import { getArchive, getArchiveLastPosts, getArchivePost } from './routes/api/ArchiveRoutes';
import { getChangelog, getChangelogs } from './routes/api/ChangelogsRoutes';
import { getChat } from './routes/api/ChatRoutes';
import { getCollection, getCollections } from './routes/api/CollectionsRoutes';
import { getColors } from './routes/api/ColorsRoutes';
import { getCompareSorts } from './routes/api/CompareSorts';
import { getEmoji, getEmojis } from './routes/api/EmojisRoutes';
import { getLinks } from './routes/api/LinksRoutes';
import { getMusic } from './routes/api/MusicRoutes';
import { getNatFiles } from './routes/api/NatRoutes';
import { getBios, getChars, getFAQ, getOutfitCats } from './routes/api/OcBiosRoutes';

const app = new Hono();
const port = 8787;

app.get('/', async (c) => {
  return c.redirect('https://teslasp2.com')
})

//#region For the Embeds
app.get("/p/:post", getPostEmbed);
app.get("/archive/post/:post", getPostEmbed);

app.get("/oc/:cat/:char", getOcEmbed);
app.get("/oc-bios/:cat/:char", getOcEmbed);

app.get("/c/:collection", getCollectionEmbed);

app.get("/t/:tag", getTagEmbed);

app.get("/archive/:tagCol", getTagOrCollectionEmbed);
//#endregion For the Embeds

app.get("/emojis", getEmojisTable);

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

app.get("/api/collections", getCollections);
app.get("/api/collection/:id", getCollection);

app.get("/api/colors", getColors);

app.get("/api/compareSorts", getCompareSorts);

app.get("/api/iEmojis", getEmojis);
app.get("/api/iEmoji/:shortCode", getEmoji);

app.get("/api/links", getLinks);

app.get("/api/music", getMusic);

app.get("/api/nat/files", getNatFiles);

app.get("/api/ocBios/chars/all", getChars);
app.get("/api/ocBios/chars/faq", getFAQ);
app.get("/api/ocBios", getBios);
app.get("/api/ocBio/outfits/categories/:set/:route", getOutfitCats);
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

serve({
  fetch: app.fetch,
  port
})
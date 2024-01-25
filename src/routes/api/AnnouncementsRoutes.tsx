import { Handler } from "hono";
import { fetchAnnouncements } from "../../lib/api/announcements/fetchAnnouncements";
import { fetchAllAnnouncements } from "../../lib/api/announcements/fetchAllAnnouncements";
import { fetchAnnouncement } from "../../lib/api/announcements/fetchAnnouncement";

export const getAnnouncements: Handler <
{},
"/api/announcements"
> = async (c) => {
    const noPinned = c.req.query('noPinned');
    const data = await fetchAnnouncements(noPinned == 'true');
    return c.json(data);
}

export const getAllAnnouncements: Handler <
{},
"/api/announcements/all"
> = async (c) => {
    const data = await fetchAllAnnouncements();
    return c.json(data);
}

export const getAnnouncement: Handler <
{},
"/api/announcement/:id"
> = async (c) => {
    const { id } = c.req.param();
    const data = await fetchAnnouncement(id);
    return c.json(data);
}
import moment from "moment";
import fs from "fs";

const router = createRouter()

router.post('/upload', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user?.isAdmin) throw createError({statusCode: 403, message: 'Доступ запрещён',})
    let formData = await readMultipartFormData(event)
    const storage = useStorage('picture');
    if (formData) {
        for (const file of formData) {
            await storage.setItemRaw(`${moment().format('YYYYMMDDHHmm')}-${file.filename}`, file.data);
        }
    }
}))

router.get('/pictures', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user?.isAdmin) throw createError({statusCode: 403, message: 'Доступ запрещён',})
    const storage = useStorage();
    const list = await storage.keys('picture')
    return list.map((p) => p.replace('picture:', '')).reverse()
}))

router.get('/picture/:file', defineEventHandler(async (event) => {
    const {file} = event.context.params as Record<string, string>
    const content = await useStorage().getItemRaw(`picture:${file}`);
    const svgString = content.toString('utf8');
    const type = svgString.trim().startsWith('<') ? 'image/svg+xml' : 'image/jpeg';
    event.node.res.setHeader('Content-Type', type);
    return content
}))

router.delete('/picture/:file', defineEventHandler(async (event) => {
    const {file} = event.context.params as Record<string, string>
    fs.unlink(`./upload/picture/${file}`, () => {
    })
}))


export default useBase('/api/blog', router.handler)
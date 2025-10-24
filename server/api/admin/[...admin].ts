const router = createRouter()

function checkAdmin(user: IUser) {
    if (!user || !user.isAdmin) throw createError({statusCode: 403, message: 'Доступ запрещён',})
    return user
}

router.get('/user-all', defineEventHandler(async (event) => {
    checkAdmin(event.context.user)
    return User.find({}, '-passwordHash').populate(User.getPopulation())
}))

router.delete('/user/delete/:_id', defineEventHandler(async (event) => {
    checkAdmin(event.context.user)
    const {_id} = event.context.params as Record<string, string>
    await User.findByIdAndDelete(_id)
}))

//User.updateMany({},{role:'admin'}).then(console.log)

router.post('/user/update/:_id', defineEventHandler(async (event) => {
    checkAdmin(event.context.user)
    const body = await readBody(event)
    const {_id} = event.context.params as Record<string, string>
    const user = await User.findById(_id)
    if (!user) throw createError({statusCode: 404, message: 'Юзер не найдена',})
    if (body.password) {
        user.password = body.password
    }
    const fields = ['type', 'firstName', 'lastName','role',
        'middleName',
        'inn',
        'company',
        'jobTitle',
        'phone',
        'parent', 'blocked']
    for (const field of fields) {
        user[field] = body[field]
    }
    await user.save()
    return user
}))

router.post('/user/create', defineEventHandler(async (event) => {
    checkAdmin(event.context.user)
    const user = await readBody(event)
    if (!user.email.includes('@qtech.ru')) {
        user.role = 'external'
    }
    return User.create(user)
}))

router.get('/user/:id', defineEventHandler(async (event) => {
    checkAdmin(event.context.user)
    const {id} = event.context.params as Record<string, string>
    return User.findById(id).populate(User.getPopulation())
}))



router.put('/clear/base', defineEventHandler(async (event) => {
    checkAdmin(event.context.user)
}))


export default useBase('/api/admin', router.handler)

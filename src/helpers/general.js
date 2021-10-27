import fs from 'fs'


/** READ DATABASE */
const readFile = () => {
    const content = fs.readFileSync(process.env.DATA, 'utf-8')
    return JSON.parse(content)
}

/** WRITE DATABASE */
const writeFile = (content) => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync(process.env.DATA, updateFile, 'utf-8')
}


/** GLOBAL VALIDATIONS */
/** FIELDS REQUIRE */
function checkRequire(req, res, next) {
    if (!req.body.email || !req.body.senha) {
        return res.status(400).send({ Message: 'Fill all fields!' })
    }
    return next()
}

/** CHECK USER ON DATABASE */
function checkUserInArray(req, res, next) {
    const { user_id } = req.params
    const users = readFile()
    const id = users.findIndex((item) => item.id === Number(user_id))
    if (id === -1) {
        return res.status(404).send({ Message: 'User not found!' });
    }

    next()
}

/** CHECK EMAIL EXIST ON DATABASE */
function checkModifications(req, res, next) {
    const { email, senha } = req.body

    if (!email && !senha) {
        return res.status(404).send({ Message: 'No changes made!' });
    }

    next()
}

/** CHECK EMAIL EXIST ON DATABASE */
function checkEmail(req, res, next) {
    const { email } = req.body
    const { user_id } = req.params
    const users = readFile()
    const exist = users.findIndex((item) => item.email === email)
    const id = users.findIndex((item) => item.id === Number(user_id))
    if (exist !== -1 && id !== Number(user_id)) {
        return res.status(404).send({ Message: 'Email already exist!' });
    }

    next()
}


export { readFile, writeFile, checkRequire, checkUserInArray, checkModifications, checkEmail }
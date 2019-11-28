require('dotenv').config()
const path = require('path')
const Telegraf = require('telegraf')
const {match} = require('telegraf-i18n')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const TelegrafI18n = require('telegraf-i18n')
const aboutScene = require('./controllers/about/index')
const startScene = require('./controllers/start/index')
const calculatorScene = require('./controllers/calculator/index')
const bonusScene = require('./controllers/bonus/index')
const consultScene = require('./controllers/consult/index')

const stage = new Stage([
    startScene,
    aboutScene,
    calculatorScene,
    bonusScene,
    consultScene
])

const i18n = new TelegrafI18n({
    defaultLanguage: 'ua',
    directory: path.resolve(__dirname, 'locales'),
    useSession: true,
    allowMissing: false,
    sessionName: 'session'
});


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(session())
bot.use(i18n.middleware());
bot.use(stage.middleware())

bot.start(async (ctx) => await ctx.scene.enter('start'))

bot.hears(match('start.keyboard.calculator'), async (ctx) => {
    await ctx.scene.enter('calculator')
})

bot.hears(match('start.keyboard.about'), async (ctx) => {
    await ctx.scene.enter('about')
})

bot.hears(match('start.keyboard.consult'), async (ctx) => {
    await ctx.scene.enter('consult')
})

bot.hears(match('start.keyboard.bonus'), async (ctx) => {
    await ctx.scene.enter('bonus')
})

bot.startPolling();
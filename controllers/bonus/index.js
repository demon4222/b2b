const Telegraf = require('telegraf')
const {Markup} = Telegraf
const Scene = require('telegraf/scenes/base')
const Stage = require('telegraf/stage')
const {leave} = Stage;
const actions = require('../../util/actions')
const {mainMiddleware} = require('../../middlewares/main')
const {getContactKeyboard} = require('../../util/keyboards/bonus/index')

const keyboard = Markup.inlineKeyboard([
    [
        Markup.urlButton("Зв'язатися самостійно", process.env.CONTACT)
    ]
]).resize().extra({parse_mode:'HTML'})

const bonus = new Scene('bonus')

bonus.use((ctx, next) => {
    mainMiddleware(ctx, next)
})

bonus.enter((ctx) => {
    ctx.reply(ctx.i18n.t('bonus.main_message'), getContactKeyboard())
});

bonus.on('contact', (ctx) => {
    let phone = ctx.message.contact.phone_number

    ctx.reply(ctx.i18n.t('bonus.finish'), keyboard)

    ctx.telegram.sendContact(process.env.CHAT_ID, phone, ctx.message.from.first_name)
})

bonus.on('message', (ctx) => {
    let message = ctx.message.text
    let match = message.match(/(^\+?3?8?(0(67|68|96|97|98)\d{7})$)|(^\+?3?8?(0[679]3\d{7})$)|(^\+?3?8?(0(66|95|99)\d{7})$)/)
    if (match) {
        ctx.reply(ctx.i18n.t('bonus.finish'), keyboard)

        ctx.telegram.sendContact(process.env.CHAT_ID, message, ctx.message.from.first_name)
    } else {
        if(message !== 'Головна') {
            ctx.reply(ctx.i18n.t('bonus.wrong_phone'), {parse_mode: "HTML"})
        }
    }
})

module.exports = bonus
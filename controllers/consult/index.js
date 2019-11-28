const Telegraf = require('telegraf')
const {Markup} = Telegraf
const Scene = require('telegraf/scenes/base')
const Stage = require('telegraf/stage')

const keyboard = Markup.inlineKeyboard([
    [
        Markup.urlButton("Зв'язатися", 'https://t.me/burlak_j')
    ]
]).resize().extra({parse_mode:'HTML'})

const consult = new Scene('consult')

consult.enter((ctx) => {
    ctx.reply(ctx.i18n.t('consult.main_message'), keyboard)
});

module.exports = consult
const Scene = require('telegraf/scenes/base')
const Stage = require('telegraf/stage')
const {leave} = Stage;
const {getAboutKeyboard} = require('../../util/keyboards/about')
const { getStartKeyboard } = require('../../util/keyboards/start')
const actions = require('../../util/actions')

const register = new Scene('register')

register.enter((ctx) => {
    let message = ctx.i18n.t('register.message_1') + process.env.REF + ctx.i18n.t('register.message_2')
    ctx.reply(message, getAboutKeyboard(ctx))
});

register.action(actions.callback.about.next, (ctx) => {
    ctx.reply(ctx.i18n.t('start.main_message'), getStartKeyboard(ctx))
})

module.exports = register
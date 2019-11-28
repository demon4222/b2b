const Scene = require('telegraf/scenes/base')
const Stage = require('telegraf/stage')
const {leave} = Stage;
const {getAboutKeyboard} = require('../../util/keyboards/about')
const { getStartKeyboard } = require('../../util/keyboards/start')
const actions = require('../../util/actions')

const about = new Scene('about')

about.enter((ctx) => {
    ctx.reply(ctx.i18n.t('about.main_message'), getAboutKeyboard(ctx))
});

about.action(actions.callback.about.next, (ctx) => {
    ctx.reply(ctx.i18n.t('start.main_message'), getStartKeyboard(ctx))
})

module.exports = about
const Scene = require('telegraf/scenes/base')
const { getStartKeyboard } = require('../../util/keyboards/start')

const start = new Scene('start')

start.enter((ctx) => {
    ctx.reply(ctx.i18n.t('start.main_message'), getStartKeyboard(ctx))
});

module.exports = start
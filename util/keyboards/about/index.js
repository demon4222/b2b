const Telegraf = require('telegraf')
const {Markup} = Telegraf
const actions = require('../../actions')

module.exports.getAboutKeyboard = getAboutKeyboard = (ctx) => {
    const keyboard = Markup.inlineKeyboard([
        [
            Markup.callbackButton(ctx.i18n.t('back_btn'), actions.callback.about.next),
        ],
    ]).oneTime().resize().extra({parse_mode:'HTML'})

    return keyboard
}
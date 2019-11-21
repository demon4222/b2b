const Telegraf = require('telegraf')
const {Markup} = Telegraf

module.exports.getStartKeyboard = getStartKeyboard = (ctx) => {
    const calculator = ctx.i18n.t('start.keyboard.calculator')
    const about = ctx.i18n.t('start.keyboard.about')
    const consult = ctx.i18n.t('start.keyboard.consult')
    const bonus = ctx.i18n.t('start.keyboard.bonus')

    const startKeyboard = Markup.keyboard([
        [
            Markup.callbackButton(calculator, calculator),
            Markup.callbackButton(about, about),
        ],
        [
            Markup.callbackButton(consult, consult),
            Markup.callbackButton(bonus, bonus),
        ]
    ]).resize().extra({parse_mode:'HTML'})

    return startKeyboard
}
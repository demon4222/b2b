const Telegraf = require('telegraf')
const {Markup} = Telegraf
const actions = require('../../actions')

module.exports.getMineralsKeyboard = getMineralsKeyboard = (ctx) => {
    const silver = ctx.i18n.t('calculator.type_silver')
    const gold = ctx.i18n.t('calculator.type_gold')

    const mineralsKeyboard = Markup.inlineKeyboard([
        [
            Markup.callbackButton(silver, actions.callback.calculator.types.silver)
        ],
        [
            Markup.callbackButton(gold, actions.callback.calculator.types.gold)
        ],
    ]).resize().extra({parse_mode:'HTML'})

    return mineralsKeyboard
}
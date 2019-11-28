const Telegraf = require('telegraf')
const {Markup} = Telegraf
const actions = require('../../actions')

module.exports.getPeriodsKeyboard = getPeriodsKeyboard = (ctx) => {
    const week = ctx.i18n.t('calculator.period_week')
    const month = ctx.i18n.t('calculator.period_month')
    const three_month = ctx.i18n.t('calculator.period_three_month')
    const half_year = ctx.i18n.t('calculator.period_half_year')
    const year = ctx.i18n.t('calculator.period_year')

    const periodsKeyboard = Markup.inlineKeyboard([
        [
            Markup.callbackButton(week, actions.callback.calculator.periods.week)
        ],
        [
            Markup.callbackButton(month, actions.callback.calculator.periods.month)
        ],
        [
            Markup.callbackButton(three_month, actions.callback.calculator.periods.three_month)
        ],
        [
            Markup.callbackButton(half_year, actions.callback.calculator.periods.half_year)
        ],
        [
            Markup.callbackButton(year, actions.callback.calculator.periods.year)
        ],
    ]).resize().extra({parse_mode:'HTML'})

    return periodsKeyboard
}
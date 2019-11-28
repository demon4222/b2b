const Scene = require('telegraf/scenes/base')
const Stage = require('telegraf/stage')
const {leave} = Stage;
const {mainMiddleware} = require('../../middlewares/main')
const actions = require('../../util/actions')
const percents = require('../../util/percents')
const {getMineralsKeyboard} = require('../../util/keyboards/calculator/minerals')
const {getPeriodsKeyboard} = require('../../util/keyboards/calculator/periods')

const stages = {
    choose_period: 1,
    choose_mineral: 2,
    enter_amount: 3,
}

const calculator = new Scene('calculator')

calculator.use((ctx, next) => {
    mainMiddleware(ctx, next)
})

calculator.enter((ctx) => {
    ctx.session.stage = stages.choose_period
    ctx.reply(ctx.i18n.t('calculator.main_message'), getPeriodsKeyboard(ctx))
})

calculator.on('callback_query', async (ctx) => {
    if (ctx.session.stage === stages.choose_period) {
        ctx.session.stage = stages.choose_mineral

        ctx.session.period = ctx.callbackQuery.data;
        await ctx.reply(ctx.i18n.t('calculator.choose_mineral'), getMineralsKeyboard(ctx))
    } else if (ctx.session.stage === stages.choose_mineral) {
        ctx.session.stage = stages.enter_amount
        ctx.session.mineral = ctx.callbackQuery.data

        await ctx.reply(ctx.i18n.t('calculator.enter_sum'))
    }
})

calculator.on('message', async (ctx) => {
    if (ctx.session.stage === stages.enter_amount) {
        let found = ctx.message.text.match(/^(\d+\.?\d{0,9}|\.\d{1,9})$/)
        if (found) {
            let amount = ctx.message.text;

            if(amount < 1000) {
                await ctx.reply(ctx.i18n.t('calculator.not_enough'), {parse_mode: "HTML"})
                return
            }

            amount = Number.parseFloat(amount).toFixed(2)

            let type = ctx.session.mineral;
            let period = ctx.session.period;

            let week = amount * percents[type][period] / 100;
            let month = 4 * week;
            let year = 12 * month;

            let frequency = ''
            switch (period) {
                case 'week':
                    frequency = 'раз у тиждень'
                    break;
                case 'month':
                    frequency = 'раз у місяць'
                    break;
                case 'three_month':
                    frequency = 'раз у 3 місяці'
                    break;
                case 'half_year':
                    frequency = 'раз у пів року'
                    break;
                case 'year':
                    frequency = 'раз у рік'
                    break;
            }

            let message = ''

            if (period === actions.callback.calculator.periods.week) {
                message = ctx.i18n.t('calculator.results.answer.first') + `<strong>${amount}</strong>` +
                    ctx.i18n.t('calculator.results.answer.second') + `<strong>${frequency}</strong>` +
                    ctx.i18n.t('calculator.results.answer.third') + ctx.i18n.t('calculator.results.answer.four') + week.toFixed(2) + ' грн' +
                    ctx.i18n.t('calculator.results.answer.five') + month.toFixed(2) +
                    ctx.i18n.t('calculator.results.answer.six') + year.toFixed(2) +
                    ctx.i18n.t('calculator.results.answer.seven') + `<strong>${(year - amount).toFixed(2)}</strong> грн`
            } else {
                message = ctx.i18n.t('calculator.results.answer.first') + `<strong>${amount}</strong>` +
                    ctx.i18n.t('calculator.results.answer.second') + `<strong>${frequency}</strong>` +
                    ctx.i18n.t('calculator.results.answer.third') +
                    ctx.i18n.t('calculator.results.answer.five') + month.toFixed(2) +
                    ctx.i18n.t('calculator.results.answer.six') + year.toFixed(2) +
                    ctx.i18n.t('calculator.results.answer.seven') + `<strong>${(year - amount).toFixed(2)}</strong> грн`
            }

            await ctx.reply(message, {parse_mode: "HTML"})


        } else {
            await ctx.reply(ctx.i18n.t('wrong_input'))
        }
    }
})

module.exports = calculator



const TelegrafI18n = require('telegraf-i18n')
const path = require('path')

const i18n = new TelegrafI18n({
    defaultLanguage: 'ua',
    directory: path.resolve('locales'),
    useSession: true,
    allowMissing: false,
    sessionName: 'session'
});

module.exports.mainMiddleware = mainMiddleware = (ctx, next) => {
    if (ctx.message) {
        if (ctx.message.text === '/start') {
            ctx.sesseion = null
            ctx.scene.enter('start')
        } else if(ctx.message.text === 'Головна') {
            ctx.sesseion = null
            ctx.scene.enter('start')
        } else if (ctx.message.text === i18n.t('ua.json', 'start.keyboard.calculator')) {
            ctx.sesseion = null;
            ctx.scene.enter('calculator')
        } else if(ctx.message.text === i18n.t('ua.json', 'start.keyboard.about')){
            ctx.sesseion = null;
            ctx.scene.enter('about')
        } else if(ctx.message.text === i18n.t('ua.json', 'start.keyboard.consult')) {
            ctx.session = null;
            ctx.scene.enter('consult')
        } else if(ctx.message.text === i18n.t('ua.json', 'start.keyboard.bonus')){
            ctx.sesseion = null;
            ctx.scene.enter('bonus')
        } else if(ctx.message.text === i18n.t('ua.json', 'start.keyboard.register')) {
            ctx.sesseion.null;
            ctx.scene.enter('register')
        }
    }
    next()
}
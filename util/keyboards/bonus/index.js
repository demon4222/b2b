const Telegraf = require('telegraf')
const {Markup} = Telegraf

module.exports.getContactKeyboard = getContactKeyboard = () => {
    const keyboard = {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: '📲 Відправити номер',
                        request_contact: true,
                    }
                ],
                [
                    {
                        text: 'Головна',
                        callback_data: 'Головна',
                        hide: false
                    }
                ]
            ]
        },
        resize_keyboard: true,
        one_time_keyboard: true
    }

    return keyboard
}
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot pronto!');

    cron.schedule('48 14 * * *', async () => {

        const groupId = '120363038435990275@g.us';

        const chat = await client.getChatById(groupId);

        chat.sendMessage('Bom dia pessoal! ☀️');

        console.log('Mensagem enviada!');
    });
});

// client.on('message_create', async msg => {
//     const chat = await msg.getChat();

//     if (chat.isGroup) {
//         console.log(chat.name);
//         console.log(chat.id._serialized);
//     }
// });

client.initialize();


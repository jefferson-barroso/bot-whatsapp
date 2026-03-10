const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot pronto!');

cron.schedule('00 19 * * *', async () => {

        const groupId = '120363038435990275@g.us';

        const chat = await client.getChatById(groupId);

        chat.sendMessage('Oi moa noite, diretto do servidor. ☀️');

        console.log('Mensagem enviada!');
    });

       cron.schedule('00 19 * * *', async () => {

        const groupId = '120363310480879736@g.us';

        const chat = await client.getChatById(groupId);

        chat.sendMessage('Boa noite meus consagrados! [Esta é uma mensagem automatica de um projeto rodando no servidor]  ');

        console.log('Mensagem enviada!');
    });
});

client.on('message_create', async msg => {
    const chat = await msg.getChat();

    if (chat.isGroup) {
        console.log(chat.name);
        console.log(chat.id._serialized);
    }
});

client.initialize();


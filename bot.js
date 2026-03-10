const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const cron = require('node-cron');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

client.on('disconnected', () => {
    console.log("Reconectando...");
    client.initialize();
});

client.on('auth_failure', msg => {
    console.error('Falha de autenticação', msg);
});

client.on('disconnected', reason => {
    console.log('Bot desconectado:', reason);
});

client.on('qr', (qr) => {
    console.log("QR RECEIVED");
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}`);
});

client.on('ready', () => {
    console.log('Bot pronto!');

cron.schedule('00 19 * * *', async () => {

        const groupId = '120363038435990275@g.us';

        const chat = await client.getChatById(groupId);

        chat.sendMessage('Oi moa noite, diretto do servidor. ☀️');

        console.log('Mensagem enviada!');
    });


cron.schedule('45 17 * * *', async () => {

        const groupId = '120363038435990275@g.us';

        const chat = await client.getChatById(groupId);

        chat.sendMessage('TA RODANDOOOOO ☀️');

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


const { Client, LocalAuth } = require('whatsapp-web.js');
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

// QR code
client.on('qr', (qr) => {
    console.log("QR RECEIVED");
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}`);
});

// pronto
client.on('ready', () => {
    console.log('Bot pronto!');

    // mensagem grupo 1
    cron.schedule('0 19 * * *', async () => {
        try {
            const chat = await client.getChatById('120363038435990275@g.us');
            await chat.sendMessage('Oi boa noite, direto do servidor. ☀️');
            console.log('Mensagem enviada grupo 1');
        } catch (err) {
            console.log("Erro envio grupo 1:", err);
        }
    }, {
        timezone: "America/Sao_Paulo"
    });

    // mensagem teste
    cron.schedule('55 17 * * *', async () => {
        try {
            const chat = await client.getChatById('120363038435990275@g.us');
            await chat.sendMessage('TA RODANDOOOOO ☀️');
            console.log('Mensagem teste enviada');
        } catch (err) {
            console.log("Erro mensagem teste:", err);
        }
    }, {
        timezone: "America/Sao_Paulo"
    });

    // mensagem  grupo 2
    cron.schedule('0 19 * * *', async () => {
        try {
            const chat = await client.getChatById('120363310480879736@g.us');
            await chat.sendMessage('Boa noite meus consagrados! [Mensagem automática do servidor]');
            console.log('Mensagem enviada grupo 2');
        } catch (err) {
            console.log("Erro envio grupo 2:", err);
        }
    }, {
        timezone: "America/Sao_Paulo"
    });

});

// reconexão
client.on('disconnected', (reason) => {
    console.log('Bot desconectado:', reason);
    console.log('Reconectando...');
    client.initialize();
});

// erro auth
client.on('auth_failure', msg => {
    console.error('Falha de autenticação:', msg);
});

// log de grupos
client.on('message_create', async msg => {
    const chat = await msg.getChat();

    if (chat.isGroup) {
        console.log("Grupo:", chat.name);
        console.log("ID:", chat.id._serialized);
    }
});

// iniciar bot
console.log("Inicializando bot...");
client.initialize();
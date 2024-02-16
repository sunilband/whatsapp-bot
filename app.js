const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  console.log("authenticated: ", session);
});
client.on("ready", () => {
  console.log("ready");
});

client.on("message", async (msg) => {
  console.log('msg body is',msg.body);
  if (msg.body === "ping") {
    await client.sendMessage(msg.from, "pong");
  }

  if (msg.body === "ilove") {
    const userName = msg._data.notifyName
    await client.sendMessage(msg.from, `Hello, ${userName}. We are working on your request. Please wait a moment.`);

    // make a time delay for 3 seconds late response
    setTimeout(() => {
      client.sendMessage(msg.from, "I love you too");
    }, 3000);
  }
});

client.initialize();

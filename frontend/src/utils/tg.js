import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
const globalConfig = {
    apiId: 28231572,
    apiHash:"c799ae89e079f82bfa840b1a6d6701dc"
}
/**
 * @name initializeGramjs
 */
export async function initGramjs(session) {
  console.log(1);
  let client = new TelegramClient(
    new StringSession(session || ""),
      globalConfig.apiId,
      globalConfig.apiHash,
    {
      connectionRetries: 5,
      useWSS: false,
    },
  );
  await client.connect();
  return client;
}

/**`
 * @name loginWithQRCodeToObtainTheQRCode
 */
export async function qrLoginGetQr(twoPas, qrCb) {
  let client = await initGramjs("");
  const user = await client.signInUserWithQrCode(
    { apiId: globalConfig.apiId, apiHash: globalConfig.apiHash },
    {
      onError: async function (p1) {
        console.log("error", p1);
        // true = stop the authentication processes
        return true;
      },
      qrCode: async (code) => {
        console.log("Convert the next string to a QR code and scan it");
        console.log(`tg://login?token=${code.token.toString("base64url")}`);
        qrCb(`tg://login?token=${code.token.toString("base64url")}`);
      },
      password: async (hint) => {
        return twoPas;
      },
    },
  );
  console.log("user is", user);
  return { x: 1 };
}

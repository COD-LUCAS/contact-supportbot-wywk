// src/handler.js

import { userState } from './data/userState.js'
import { sendProductMenu } from './features/storeMenu.js'
import dotenv from 'dotenv'

dotenv.config()

const ADMIN_JID = process.env.ADMIN_JID

export async function handler(sock, msg) {

  if (!msg?.message) return

  const from = msg.key.remoteJid

  if (from === ADMIN_JID) return

  // Button response
  const btnId =
    msg.message?.buttonsResponseMessage?.selectedButtonId

  // Text message
  const text = (
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    ''
  ).trim().toLowerCase()

  // SERVICES BUTTON
  if (btnId === 'btn_services') {

    await sock.sendMessage(from, {
      text:
`🛍️ *Our Services*

🚀 Digital Marketing
📈 Social Media Promotion
🛒 E-commerce Solutions
🤖 WhatsApp Automation
🌐 Website Development
📍 Google Business Setup
🎨 Branding & Designing
💻 Digital Support Services

📞 Contact:
+91 8281885620
📧 support@wywk.in`
    })

    return
  }

  // SALES BUTTON
  if (btnId === 'btn_sales') {

    await sock.sendMessage(from, {
      text:
`🤝 *Sales Team*

📞 +91 8281885620
📧 support@wywk.in

Our team will assist you shortly.`
    })

    return
  }

  // QUERY BUTTON
  if (btnId === 'btn_query') {

    await sock.sendMessage(from, {
      text:
`📋 *Raise a Query*

Please type your query.

Our support team will respond soon.`
    })

    return
  }

  // Optional keywords
  if (
    text === 'menu' ||
    text === 'hi' ||
    text === 'hello' ||
    text === 'start'
  ) {

    await sendProductMenu(sock, from)

    userState.set(from, {
      step: 'menuMain'
    })

    return
  }

  // Default reply
  await sendProductMenu(sock, from)

  userState.set(from, {
    step: 'menuMain'
  })

}

// src/features/storeMenu.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function sendProductMenu(sock, from) {
  const bannerPath = path.join(__dirname, '../assets/tempe-brand.jpg')
  const buffer = fs.existsSync(bannerPath) ? fs.readFileSync(bannerPath) : null

  const bodyText =
    `🏢 *Welcome to Test Company!*\n\n` +
    `We provide premium quality products delivered right to your door.\n\n` +
    `📍 123 Main Street, Jakarta, Indonesia\n` +
    `📧 support@testcompany.com\n` +
    `🕘 Mon–Sat, 9AM–6PM\n\n` +
    `How can we help you today?`

  const buttons = [
    { buttonId: 'btn_services', buttonText: { displayText: '🛍️ Show Services' }, type: 1 },
    { buttonId: 'btn_sales', buttonText: { displayText: '🤝 Connect with Sales Team' }, type: 1 },
    { buttonId: 'btn_query', buttonText: { displayText: '📋 Raise a Query' }, type: 1 },
  ]

  const msgPayload = {
    buttons,
    headerType: 1,
    footer: '© Test Company',
  }

  if (buffer) {
    await sock.sendMessage(from, {
      image: buffer,
      caption: bodyText,
      ...msgPayload,
    })
  } else {
    await sock.sendMessage(from, {
      text: bodyText,
      ...msgPayload,
    })
  }
}

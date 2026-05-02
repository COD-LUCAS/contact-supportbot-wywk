// src/features/storeMenu.js

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function sendProductMenu(sock, from) {

  const bannerPath = path.join(__dirname, '../assets/wywk-banner.jpg')

  const buffer = fs.existsSync(bannerPath)
    ? fs.readFileSync(bannerPath)
    : null

  const bodyText =
    `🏢 *Welcome to WhatYouWantKerala!*\n\n` +
    `Your Complete Digital Growth Partner.\n\n` +

    `🚀 Digital Marketing\n` +
    `🛒 E-commerce Solutions\n` +
    `🤖 WhatsApp Automation\n` +
    `📈 Business Branding\n` +
    `📍 Google Maps Setup\n` +
    `💻 Digital Services & Support\n\n` +

    `📍 Malappuram, Chemmad\n` +
    `📧 support@wywk.in\n` +
    `📞 +91 8281885620\n\n` +

    `How can we help you today?`

  const buttons = [
    {
      buttonId: 'btn_services',
      buttonText: {
        displayText: '🛍️ View Services'
      },
      type: 1
    },
    {
      buttonId: 'btn_sales',
      buttonText: {
        displayText: '🤝 Contact Team'
      },
      type: 1
    },
    {
      buttonId: 'btn_query',
      buttonText: {
        displayText: '📋 Raise Query'
      },
      type: 1
    }
  ]

  const msgPayload = {
    buttons,
    headerType: 1,
    footer: '© WhatYouWantKerala'
  }

  try {

    if (buffer) {

      await sock.sendMessage(from, {
        image: buffer,
        caption: bodyText,
        ...msgPayload
      })

    } else {

      await sock.sendMessage(from, {
        text: bodyText,
        ...msgPayload
      })

    }

  } catch (err) {

    console.log('Error sending store menu:', err)

    await sock.sendMessage(from, {
      text: '❌ Failed to send store menu.'
    })

  }

}

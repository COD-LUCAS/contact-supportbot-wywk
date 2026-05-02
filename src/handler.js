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

  // Read button response
  const btnId = msg.message?.buttonsResponseMessage?.selectedButtonId
  
  // Read plain text
  const text = (
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    ''
  ).trim().toLowerCase()

  if (btnId === 'btn_services') {
    await sock.sendMessage(from, { text: '🛍️ *Services* — coming soon!' })
    return
  }

  if (btnId === 'btn_sales') {
    await sock.sendMessage(from, { text: '🤝 *Sales Team* — coming soon!' })
    return
  }

  if (btnId === 'btn_query') {
    await sock.sendMessage(from, { text: '📋 *Raise a Query* — coming soon!' })
    return
  }

  // Default — show main menu
  await sendProductMenu(sock, from)
  userState.set(from, { step: 'menuMain' })
}

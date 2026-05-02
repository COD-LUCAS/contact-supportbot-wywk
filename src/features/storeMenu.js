// src/features/storeMenu.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function sendProductMenu(sock, from) {
  // Update banner to your branding asset
  const bannerPath = path.join(__dirname, '../assets/wywk-banner.jpg')
  const buffer = fs.existsSync(bannerPath) ? fs.readFileSync(bannerPath) : null

  const listPayload = {
    title: 'Explore Our Services',
    sections: [
      {
        title: 'Development Services',
        rows: [
          { title: 'Web Development', description: 'Professional & High-performance websites', id: 'service_web_dev' },
          { title: 'Custom Software', description: 'Tailor-made solutions for your business', id: 'service_custom_soft' },
          { title: 'Custom ERP', description: 'Enterprise Resource Planning systems', id: 'service_erp' },
          { title: 'Custom Web Apps', description: 'Interactive and scalable web applications', id: 'service_web_apps' },
        ],
      },
      {
        title: 'Specialized Solutions',
        rows: [
          { title: 'E-Invoicing System', description: 'Global E-Invoicing integration for any App', id: 'service_einvoice' },
          { title: 'WhatsApp Automation', description: 'Scale your communication via API', id: 'service_wa_auto' },
          { title: 'E-Commerce Platforms', description: 'Robust online stores & payment integration', id: 'service_ecommerce' },
          { title: 'LMS Platforms', description: 'Complete Learning Management Systems', id: 'service_lms' },
          { title: 'Restaurant Ordering', description: 'Automated food ordering & menu systems', id: 'service_food_sys' },
        ],
      },
    ],
  }

  const message = {
    footer: '©️ 2026 WhatYouWantKerala — wywk.in',
    interactiveButtons: [
      { 
        name: 'single_select', 
        buttonParamsJson: JSON.stringify(listPayload) 
      },
    ],
  }

  const welcomeText = 
    '*Welcome to WhatYouWantKerala!*\n\nTransform your business with our custom digital solutions. Please select a service below to learn more:'

  if (buffer) {
    await sock.sendMessage(from, {
      image: buffer,
      caption: welcomeText,
      ...message,
    })
  } else {
    await sock.sendMessage(from, {
      text: welcomeText,
      ...message,
    })
  }
}
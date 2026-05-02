// src/features/orderHandler.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SERVICES = {
  service_web_dev: {
    id: 'service_web_dev',
    title: 'Web Development',
    price: 'Contact for Quote',
    desc: 'High-performance, SEO-friendly websites tailored for your business needs. From landing pages to corporate portals.',
    image: path.join(__dirname, '../assets/web-dev.jpg'),
  },
  service_custom_soft: {
    id: 'service_custom_soft',
    title: 'Custom Software Development',
    price: 'Custom Pricing',
    desc: 'Bespoke software solutions designed to solve your specific operational challenges and improve efficiency.',
    image: path.join(__dirname, '../assets/software-dev.jpg'),
  },
  service_erp: {
    id: 'service_erp',
    title: 'Custom ERP Development',
    price: 'Project Based',
    desc: 'Comprehensive Enterprise Resource Planning systems to manage your finance, inventory, and human resources in one place.',
    image: path.join(__dirname, '../assets/erp.jpg'),
  },
  service_einvoice: {
    id: 'service_einvoice',
    title: 'E-Invoicing System Integration',
    price: 'Module Based',
    desc: 'Seamlessly integrate E-Invoicing capabilities into your existing software or web apps, compliant with global standards.',
    image: path.join(__dirname, '../assets/einvoice.jpg'),
  },
  service_web_apps: {
    id: 'service_web_apps',
    title: 'Custom Web Applications',
    price: 'Contact for Quote',
    desc: 'Scalable and interactive web applications (SaaS) built with modern stacks like React, Node.js, and PHP.',
    image: path.join(__dirname, '../assets/web-apps.jpg'),
  },
  service_ecommerce: {
    id: 'service_ecommerce',
    title: 'E-Commerce Solutions',
    price: 'Starting from ₹XX,XXX',
    desc: 'Feature-rich online stores with secure payment gateways, inventory management, and user-friendly admin panels.',
    image: path.join(__dirname, '../assets/ecommerce.jpg'),
  },
  service_wa_auto: {
    id: 'service_wa_auto',
    title: 'WhatsApp Automation',
    price: 'API Based',
    desc: 'Automate your customer communication, notifications, and support using high-speed WhatsApp API gateways.',
    image: path.join(__dirname, '../assets/wa-auto.jpg'),
  },
  service_lms: {
    id: 'service_lms',
    title: 'Learning Management System',
    price: 'Contact for Quote',
    desc: 'Complete digital learning platforms for schools, colleges, and private tutors with student/teacher dashboards.',
    image: path.join(__dirname, '../assets/lms.jpg'),
  },
  service_food_sys: {
    id: 'service_food_sys',
    title: 'Restaurant Ordering System',
    price: 'Per Branch',
    desc: 'Contactless digital menus and automated ordering systems for cafes and restaurants to streamline service.',
    image: path.join(__dirname, '../assets/restaurant.jpg'),
  },
}

export function getProduct(productId) {
  return SERVICES[productId] || null
}

export async function showProductDetail(sock, from, productId) {
  const service = getProduct(productId)
  if (!service) {
    await sock.sendMessage(from, { text: 'Service details not found.' })
    return
  }

  const buffer = fs.existsSync(service.image) ? fs.readFileSync(service.image) : null
  const caption = `*${service.title}*\nStatus: ${service.price}\n\n${service.desc}\n\nClick the button below to discuss your project requirements.`

  // Rebranded button for professional services
  const actionButton = [{ buttonId: 'inquire_now', buttonText: { displayText: 'Inquire Now' }, type: 1 }]

  const footerText = '©️ 2026 WhatYouWantKerala — wywk.in'

  if (buffer) {
    await sock.sendMessage(from, {
      image: buffer,
      caption,
      footer: footerText,
      buttons: actionButton,
      headerType: 4,
    })
  } else {
    await sock.sendMessage(from, {
      text: caption,
      footer: footerText,
      buttons: actionButton,
    })
  }
}
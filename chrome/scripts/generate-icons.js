#!/usr/bin/env node
/**
 * ∞ BiasGuard Chrome - Icon Generator ∞
 * 
 * Generates PNG icons from shield emoji
 * 16x16, 48x48, 128x128
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const sizes = [16, 48, 128];
const outputDir = path.join(__dirname, '../icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate icons
for (const size of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background gradient (dark blue → darker blue)
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#0A1628');
  gradient.addColorStop(1, '#1A1F2E');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Shield emoji (centered)
  const fontSize = Math.floor(size * 0.7);
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🛡️', size / 2, size / 2);
  
  // Save
  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(outputDir, `icon${size}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`✓ Generated ${filename}`);
}

console.log('\n∞ All icons generated ∞');

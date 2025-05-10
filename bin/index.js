#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const tech = process.argv[2];

if (!tech) {
  console.log('❌ Please specify a technology. Example: gitignore-gen node');
  process.exit(1);
}

const filePath = path.join(__dirname, '..', 'templates', `${tech}.gitignore`);

if (!fs.existsSync(filePath)) {
  console.log(`🚫 No template found for '${tech}'.`);
  process.exit(1);
}

fs.copyFileSync(filePath, '.gitignore');
console.log(`✅ .gitignore for '${tech}' created.`);

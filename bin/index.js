#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');

// Получаем аргумент (технологию) или команду
const arg = process.argv[2];

if (arg === '--list') {
  const templatesDir = path.join(__dirname, '..', 'templates');

  if (!fs.existsSync(templatesDir)) {
    console.log('📂 Templates folder not found.');
    process.exit(1);
  }

  const files = fs.readdirSync(templatesDir)
    .filter(file => file.endsWith('.gitignore'))
    .map(file => path.basename(file, '.gitignore'));

  if (files.length === 0) {
    console.log('🚫 No templates found.');
  } else {
    console.log('📄 Available templates:');
    files.forEach(f => console.log(`  • ${f}`));
  }

  process.exit(0);
}

const tech = arg;

if (!tech) {
  console.log('❌ Please specify a technology. Example: gitignoregen node');
  process.exit(1);
}

// Пути
const cacheDir = path.join(os.homedir(), '.gitignoregen-cache');
const cachePath = path.join(cacheDir, `${tech}.gitignore`);
const templatePath = path.join(__dirname, '..', 'templates', `${tech}.gitignore`);

// Убедимся, что папка кеша существует
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

function useCache() {
  if (fs.existsSync(cachePath)) {
    fs.copyFileSync(cachePath, '.gitignore');
    console.log(`📦 Loaded from cache: '${tech}'`);
    return true;
  }
  return false;
}

function useTemplateAndCache() {
  if (!fs.existsSync(templatePath)) {
    console.log(`🚫 No template found for '${tech}'.`);
    process.exit(1);
  }

  const content = fs.readFileSync(templatePath, 'utf-8');
  fs.writeFileSync('.gitignore', content);
  fs.writeFileSync(cachePath, content);
  console.log(`📁 Used local template and cached '${tech}'`);
}

if (!useCache()) {
  useTemplateAndCache();
}

console.log(chalk.green("✅ .gitignore згенеровано успішно!"));

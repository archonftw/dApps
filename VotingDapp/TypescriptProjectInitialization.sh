#!/bin/bash

# Exit immediately if a command fails
set -e

echo "🚀 Initializing TypeScript Node project..."

# Ask for project name
read -p "Enter project name: " PROJECT_NAME

# Create project folder
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME"

echo "📦 Running npm init..."
npm init -y

echo "📥 Installing dev dependencies..."
npm install typescript ts-node nodemon @types/node --save-dev

echo "⚙ Creating tsconfig.json..."
npx tsc --init

# Overwrite tsconfig.json with clean config
cat > tsconfig.json <<EOL
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
EOL

echo "📁 Creating folder structure..."
mkdir src
touch src/index.ts

# Add starter code
cat > src/index.ts <<EOL
const message: string = "Hello TypeScript 🚀";

console.log(message);
EOL

# Update package.json scripts
node -e '
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("package.json"));
pkg.scripts = {
  dev: "nodemon --exec ts-node src/index.ts",
  build: "tsc",
  start: "node dist/index.js"
};
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
'

echo "✅ Project setup complete!"
echo ""
echo "Next steps:"
echo "cd $PROJECT_NAME"
echo "npm run dev"

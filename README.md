# Today Do - Chrome New Tab Extension

A beautiful and productive Chrome new tab extension to boost your daily productivity.

![Today Do](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **📝 Todo List** - Organize tasks with priority levels (Low, Medium, High)
- **⏰ Pomodoro Timer** - 25/5 work/break cycles with notifications
- **🌤️ Weather Widget** - Real-time weather information with auto-location
- **💭 Daily Quotes** - Inspirational quotes to start your day
- **📋 Quick Notes** - Fast note-taking with auto-save (1-second debounce)
- **🎨 Dynamic Backgrounds** - Beautiful daily background images
- **🌏 Multi-language** - English and Korean support
- **⚙️ Easy Configuration** - In-app settings panel for all configurations

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Chrome browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/today-do.git
   cd today-do
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **"Developer mode"** (toggle in top-right corner)
   - Click **"Load unpacked"**
   - Select the `dist` folder from the project

5. **Open a new tab** - Your Today Do dashboard is ready!

## ⚙️ Configuration

### First-Time Setup

When you first open the extension, you'll need to configure your API keys:

1. Click the **Settings** icon (⚙️) in the top-right corner
2. Go to the **API Settings** tab
3. Add your API keys (see below for instructions)

### Getting API Keys

#### Pexels API (Background Images)
1. Visit [Pexels API](https://www.pexels.com/api/)
2. Sign up for a free account
3. Copy your API key
4. Paste it in Settings → API Settings → Pexels API Key
5. **Free tier**: 200 requests/hour

#### QWeather API (Weather Data)
1. Visit [QWeather Dev Console](https://dev.qweather.com/)
2. Sign up for a free account
3. Create a new project
4. Copy your API key
5. Paste it in Settings → API Settings → QWeather API Key
6. **Free tier**: 1,000 requests/day

### Settings Options

#### API Settings
- **Pexels API Key** - For background images
- **QWeather API Key** - For weather data
- **QWeather API Host** (Advanced) - Custom API endpoint if needed

#### General Settings
- **Language** - Choose between English and Korean
- **Weather Location** - Enter coordinates (lon,lat) or leave empty for auto-detection
  - Format: `longitude,latitude`
  - Example: `121.409,31.029` (Shanghai)

## 🛠️ Development

### Available Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Project Structure

```
today-do/
├── src/
│   ├── components/        # React components
│   │   ├── Background/    # Dynamic background
│   │   ├── Clock/         # Clock widget
│   │   ├── Notes/         # Quick notes
│   │   ├── Pomodoro/      # Pomodoro timer
│   │   ├── Quote/         # Daily quote
│   │   ├── Settings/      # Settings panel
│   │   ├── Todo/          # Todo list
│   │   └── Weather/       # Weather widget
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions & API
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/
│   └── manifest.json      # Chrome extension manifest
└── dist/                  # Built extension (generated)
```

## 🎨 Tech Stack

- **React 19.2.0** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.2** - Build tool with HMR
- **Tailwind CSS v4** - Styling with glassmorphism
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## 📦 Building for Distribution

To create a distributable package:

```bash
# Build the extension
npm run build

# The dist/ folder contains your extension
# You can zip it for distribution:
zip -r today-do-v1.0.0.zip dist/
```

## 🌐 Browser Compatibility

- ✅ Google Chrome (Manifest V3)
- ✅ Microsoft Edge (Chromium)
- ✅ Brave Browser
- ✅ Any Chromium-based browser

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Background images powered by [Pexels](https://www.pexels.com)
- Weather data powered by [QWeather](https://www.qweather.com)
- Icons by [Lucide](https://lucide.dev)

## 💡 Troubleshooting

### Weather widget shows an error
- Make sure you've added your QWeather API key in Settings
- Check that your location format is correct (lon,lat)
- Verify your API key is valid in the browser console (F12)

### Background image doesn't load
- Make sure you've added your Pexels API key in Settings
- Check the browser console for any API errors
- Verify you haven't exceeded the free tier limits

### Extension doesn't work after installation
- Make sure you've built the project (`npm run build`)
- Check that Developer Mode is enabled in Chrome extensions
- Try reloading the extension in `chrome://extensions/`


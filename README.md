# English-Turkish Dictionary App

A modern English-Turkish dictionary application built with Next.js and designed with the help of Anthropic's Claude AI.

## 🚀 Features

- 🔍 Real-time search functionality
- 🎯 Alphabetical filtering
- 🔄 Sort/Shuffle options
- 👀 Show/Hide translations
- 🎨 Dark/Light theme support
- 🗣️ Text-to-speech for English words
- 📱 Responsive design
- ⚡ Fast and efficient with virtualized list

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:**
  - [React Icons](https://react-icons.github.io/react-icons)
  - [React Window](https://react-window.vercel.app/) (for virtualization)
- **Fonts:** [Geist Font](https://vercel.com/font)
- **Development:**
  - TypeScript
  - ESLint
  - Prettier

## 🎯 AI Assistance

This project was developed with the assistance of Anthropic's Claude AI, which helped with:

- Code structure and organization
- UI/UX design decisions
- Component architecture
- TypeScript type definitions
- Styling with Tailwind CSS

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/erkanozturkdev/dictionary.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Project Structure

```
dictionary/
├── app/
│   ├── components/
│   │   └── DictionaryItem.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── Dictionary.tsx
│   ├── data.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
└── package.json
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/erkanozturkdev/dictionary/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to [Anthropic's Claude](https://www.anthropic.com/claude) for AI assistance
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com) for hosting and deployment platform

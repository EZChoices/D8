# Delta8 Site

A minimal e-commerce frontend for Delta-8 products built with Next.js 14, TypeScript, and Tailwind CSS.

## Features
- Static product catalog defined in [`src/lib/products.ts`](src/lib/products.ts)
- Product detail pages, shop, checkout, and informational pages (about, contact)
- Responsive design using Tailwind CSS
- Node.js test suite ensuring required dependencies

## Roadmap
- Real shopping cart and checkout flow
- Back-end integration for product data and inventory
- Additional tests and lint rules
- Deployment workflow (e.g. Vercel)

## Setup
1. **Requirements**: Node.js 18–22 and npm
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Visit <http://localhost:3000> to view the app.

## Development
- `npm run lint` – run ESLint
- `npm run build` – create a production build

## Testing
Run the Node.js test suite:
```bash
npm test
```

## Contributing
Pull requests are welcome! Please:
1. Fork the repository and create a new branch
2. Run `npm run lint` and `npm test`
3. Open a pull request describing your changes

## License
This project is licensed under the [MIT License](LICENSE).

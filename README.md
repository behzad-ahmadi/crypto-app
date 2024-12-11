# **Crypto Price Tracker**

A simple and visually appealing web application built with Next.js, Tailwind CSS, and DaisyUI to display real-time cryptocurrency prices. It fetches data from the CoinGecko and Coinex API and provides an easy-to-use interface for tracking the top cryptocurrencies by market capitalization.

---

## **Features**

- 🔄 **Real-time Cryptocurrency Prices**: Get updated prices for the top 10 cryptocurrencies in USD.
- 🔍 **Responsive Design**: Mobile-friendly and optimized for various screen sizes.
- 📈 **Price Changes**: Displays 24-hour price change percentages with color-coded indicators (green for positive, red for negative).
- 🖌️ **Modern UI**: Styled with Tailwind CSS and DaisyUI for a clean and professional look.

---

## **Technologies Used**

- **Next.js**: Framework for building React applications with server-side rendering.
- **TypeScript**: Ensures type safety and scalability.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **DaisyUI**: Pre-built components for faster development.
- **Axios**: For API data fetching.
- **Coinex API**: Provides  cryptocurrency data.
- **CoinGecko API**: Provides cryptocurrency data and icons.
- **Websocket**: To present live crypto price

---

## **Getting Started**

### **Prerequisites**
- Node.js (v16 or above)
- npm or yarn package manager

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crypto-price-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd crypto-price-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### **Running the Application**
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## **API Reference**

The application uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency market data.

**Endpoint Used**:  
`GET /coins/markets`  
`wss://socket.coinex.com/v2/spot`

**Parameters**:
- `vs_currency`: The target currency (e.g., USD).
- `order`: Sorting order (e.g., `market_cap_desc`).
- `per_page`: Number of results per page.
- `page`: The page number.

---

## **Project Structure**

```
crypto-price-tracker/
│
├── pages/
│   └── index.tsx       # Main page displaying cryptocurrency data
│
├── lib/
│   └── getCryptoData.ts # API function to fetch data
│
├── styles/
│   └── globals.css     # Tailwind CSS configuration
│
├── public/
│   └── favicon.ico     # App favicon
│
└── tailwind.config.js  # Tailwind CSS and DaisyUI configuration
```

---

## **Deployment**

This app is ready to be deployed on Vercel:
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/).
3. Import the repository and deploy with a single click.

---

## **Screenshots**

### **Homepage**

---

## **Contributing**

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push:
   ```bash
   git push origin feature-name
   ```
4. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.

---

## **Acknowledgments**

- [Coinex API](https://docs.coinex.com/api/v2/) for providing the data.
- [CoinGecko API](https://www.coingecko.com/en/api) for providing the data.
- [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) for simplifying UI development.


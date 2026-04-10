# FinDNA - Personal Finance & Budget Manager

FinDNA is a modern, full-stack personal finance application designed to help you track your transactions, manage income and expenses, and set financial goals. Built with cutting-edge web technologies, it offers a seamless, interactive, and beautiful user experience.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality.
- **Interactive Dashboard**: A comprehensive overview of your financial health with dynamic charts.
- **Budget & Transaction Tracking**: Easily add, categorize, and monitor detailed logs of your income and expenses.
- **Goal Management**: Set custom savings targets for specific purchases (e.g., car, bike, gold, electronics) and track your progress month-by-month.
- **Responsive Design**: A sleek, modern UI that works flawlessly across all devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database Engine**: PostgreSQL
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts & Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Security**: Password hashing using [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- A PostgreSQL database (e.g., via Supabase, Neon, or local PostgreSQL instance)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd findna-web
   ```

2. **Install dependencies**:
   Using npm:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your database URL connection string:
   ```env
   # Example format
   DATABASE_URL="postgresql://user:password@host:port/database_name?schema=public"
   ```

4. **Initialize Database**:
   Generate the Prisma client and sync your schema with the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## 🗄️ Core Database Schema

FinDNA is powered by structured relational data:
- **`User`**: Securely stores profile and authentication details.
- **`Transaction`**: Records granular entries for both `income` and `expense` activities.
- **`Goal`**: Tracks long-term financial targets, accumulated savings, and expected timelines in months.

## 📝 License

This project is licensed under the MIT License.

# Financely

Financely is a personal finance management application that helps users track their income, expenses, and investments. It is built using React for the frontend, Redux for state management, Firebase for authentication, and includes features for exporting and importing data in CSV format, as well as visualizing financial data through graphs.

## Features

- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Income and Expense Tracking**: Easily record and categorize your income and expenses.
- **Investment Tracking**: Keep track of your investments and monitor their performance.
- **Data Visualization**: View your financial data in intuitive graphs and charts.
- **Export and Import**: Export your data to CSV files and import CSV files to update your records.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A state management tool for JavaScript applications.
- **Firebase Authentication**: A service that provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users.
- **Chart.js**: A JavaScript library for creating beautiful charts.
- **Papa Parse**: A powerful CSV parser that can handle large files.

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nainee99/financely.git
   ```

2. Navigate to the project directory:

   ```bash
   cd financely
   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Create a `.env` file in the root of your project and add your Firebase configuration:
   ```env
   REACT_APP_API_KEY=your_api_key
   REACT_APP_AUTH_DOMAIN=your_auth_domain
   REACT_APP_PROJECT_ID=your_project_id
   REACT_APP_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_APP_ID=your_app_id
   ```

### Running the Application

1. Start the development server:

   ```npm
   npm run dev

   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Login/Register**: Use Firebase Authentication to create an account or log in.
- **Dashboard**: View an overview of your financial status.
- **Add Transactions**: Add your income, expenses, and investments.
- **Visualize Data**: Use graphs and charts to get insights into your finances.
- **Export Data**: Export your financial data to a CSV file.
- **Import Data**: Import your financial data from a CSV file.

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

If you have any questions or suggestions, feel free to reach out to me at nainee909@gmail.com.

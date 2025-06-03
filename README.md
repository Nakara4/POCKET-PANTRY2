# 🥗 Pocket Pantry

Turn your leftover ingredients into delicious meals! Pocket Pantry is a smart recipe finder that helps you cook with what you already have.

## 🌟 Features

- **Ingredient-Based Search**: Enter what's in your fridge and get matching recipes
- **Diet Filters**: Easy filtering for vegan, keto, gluten-free, and more
- **Save Favorites**: Bookmark your favorite recipes for quick access
- **Smart Matching**: Powered by Spoonacular API for accurate recipe suggestions
- **User Authentication**: Secure login and personalized experience

## 🚀 Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Python (FastAPI)
- **Authentication**: Firebase
- **API**: Spoonacular
- **Styling**: Tailwind CSS

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- Firebase account
- Spoonacular API key

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nakara4/POCKET-PANTRY2.git
   cd POCKET-PANTRY
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in both frontend and backend directories with:
   ```
   # Frontend
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   
   # Backend
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

5. Start the development servers:
   ```bash
   # Frontend
   npm run dev
   
   # Backend
   uvicorn main:app --reload
   ```

## 🎯 Usage

1. Sign up or log in to your account
2. Enter ingredients you have in your pantry
3. Apply any dietary filters if needed
4. Browse through matching recipes
5. Save your favorites for later

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Authors

- [@Nakara4](https://github.com/Nakara4)

## 🙏 Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for providing recipe data
- [Firebase](https://firebase.google.com/) for authentication services
- All contributors who help improve this project
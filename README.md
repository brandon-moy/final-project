# StudyBuddy

A full-stack web application for students to create and study flashcards.

## :thinking: Why I built this

While attending LearningFuze's Accelerated Full Immersion Web Development Bootcamp I found myself using
apps like Brainscapes and Quizlet to study the information I was learning. I wanted to create a flash card
app for myself and future students to use and study with. I also wanted to create something that felt more
immersive with a classroom/supplies theme and CSS animations. The buddy and instructor cats in the app if based on my
two cat, Bacchus and Apollo!

### 🔗 Live Demo

Try the application live here: https://study-buddy.brandonmoy.com/

## 💻 Technologies Used

### Languages
- HTML5
- CSS3
- JavaScript (ES6)
- React
- JSX
- Node.js
- Express.js
- Babel
- Webpack
- Argon2
- JSON Web Token
- Dotenv

## :open_book: Features
- Users can create a folder for flashcards
- Users can add flashcards to the folder
- Users can view flashcards in a folder
- Users can edit a flashcard
- Users can delete a flashcard
- Users can delete an entire folder of flashcards
- Users can study a folder of flashcards
- Users can rate their confidence of their flashcards (while studying)
- Users can see their confidence average for a folder
- Users can reset their confidence for a folder (resets all flashcards in the folder)

## :books: Stretch Features
- Users can sign up for an account
- Users can sign in to their account
- Users can sign out of their account
- Users can choose a study order for their flashcards (standard, shuffle, of by confidence)
- Users can follow a tour on their first sign in

## :eyes: Preview

### User can create a folder for flashcards / Users can add flashcards to the folder
![Add Folder & Card](/read-me-gifs/add-deck-card-feature.gif "Creating a folder and adding a flashcard")

### Users study a folder of flashcards
![Studying flashcards](/read-me-gifs/study-feature.gif "Studying flashcards")

### Users can follow a tour on their first sign in
![Tour](/read-me-gifs/tour-feature.gif "Touring the StudyBuddy")

## :notebook: Features in Development
- Users can retake the tour

## :man_technologist: Development

### Getting Started

1. Clone the repository
```
git clone https://github.com/brandon-moy/study-buddy.git
```
2. Install dependencies with Node Package Manager
```
npm install
```
3. Create a local .env file from provided example file
```
cp .env.example .env
```
4. Set the TOKEN_SECRET from 'changeMe' on your .env file
```
TOKEN_SECRET=changeMe <--
```
5. Start PostgreSQL
```
sudo service postgresql start
```
6. Create a database
```
createdb name-of-database
```
7. Update the DATABASE_URL in your .env file. Switch 'changeMe' to the name-of-database created
```
DATABASE_URL=postgres://dev:dev@localhost/changeMe?sslmode=disable
```
8. Start pgweb to view the database information
```
pgweb --db=name-of-database
```
9. Initialize the database with schema.sql and import any starting data from data.sql
```
npm run db:import
```
10. Start the project! Open a new terminal and run this script. Project can be viewed at http://localhost:3000 in your browser after running the command
```
npm run dev
```

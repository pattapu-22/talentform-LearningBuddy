// import admin from 'firebase-admin';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const serviceAccount = require('./serviceAccountKey.json');


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();

// async function upload() {
//   const quizzes = {
//     math: {
//       title: "Mathematics Quiz",
//       color: "blue",
//       questions: [
//         { q: "What is 15 + 27?", options: ["42", "41", "43", "40"], correct: "42" },
//         { q: "What is 8 × 9?", options: ["71", "72", "73", "74"], correct: "72" },
//         { q: "What is 144 ÷ 12?", options: ["11", "12", "13", "14"], correct: "12" },
//         { q: "What is 25% of 80?", options: ["15", "20", "25", "30"], correct: "20" },
//         { q: "What is 2³?", options: ["6", "8", "9", "12"], correct: "8" },
//         { q: "What is the square root of 64?", options: ["6", "7", "8", "9"], correct: "8" },
//         { q: "What is 7 × 6 - 10?", options: ["32", "31", "33", "30"], correct: "32" },
//         { q: "What is 100 - 37?", options: ["63", "73", "53", "67"], correct: "63" },
//         { q: "What is 15² - 200?", options: ["25", "35", "45", "55"], correct: "25" },
//         { q: "If x + 5 = 12, what is x?", options: ["6", "7", "8", "9"], correct: "7" }
//       ]
//     },
//     science: {
//       title: "Science Quiz",
//       color: "green",
//       questions: [
//         { q: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], correct: "H2O" },
//         { q: "How many bones are in an adult human body?", options: ["196", "206", "216", "226"], correct: "206" },
//         { q: "What planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correct: "Mercury" },
//         { q: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: "Carbon Dioxide" },
//         { q: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: "Diamond" },
//         { q: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correct: "300,000 km/s" },
//         { q: "Which blood type is known as the universal donor?", options: ["A", "B", "AB", "O"], correct: "O" },
//         { q: "What is the largest organ in the human body?", options: ["Liver", "Brain", "Lungs", "Skin"], correct: "Skin" },
//         { q: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correct: "4" },
//         { q: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: "Au" }
//       ]
//     },
//     history: {
//       title: "History Quiz",
//       color: "purple",
//       questions: [
//         { q: "In which year did World War II end?", options: ["1944", "1945", "1946", "1947"], correct: "1945" },
//         { q: "Who was the first President of the United States?", options: ["John Adams", "Thomas Jefferson", "George Washington", "Benjamin Franklin"], correct: "George Washington" },
//         { q: "Which ancient wonder was located in Alexandria?", options: ["Hanging Gardens", "Lighthouse", "Colossus", "Mausoleum"], correct: "Lighthouse" },
//         { q: "The French Revolution began in which year?", options: ["1789", "1790", "1791", "1792"], correct: "1789" },
//         { q: "Who painted the ceiling of the Sistine Chapel?", options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"], correct: "Michelangelo" },
//         { q: "Which empire was ruled by Julius Caesar?", options: ["Greek", "Roman", "Egyptian", "Persian"], correct: "Roman" },
//         { q: "The Great Wall of China was built to keep out which group?", options: ["Mongols", "Japanese", "Russians", "Koreans"], correct: "Mongols" },
//         { q: "Which explorer discovered America in 1492?", options: ["Vasco da Gama", "Ferdinand Magellan", "Christopher Columbus", "Amerigo Vespucci"], correct: "Christopher Columbus" },
//         { q: "The Industrial Revolution began in which country?", options: ["France", "Germany", "England", "United States"], correct: "England" },
//         { q: "Who was known as the 'Iron Lady'?", options: ["Queen Elizabeth", "Margaret Thatcher", "Indira Gandhi", "Golda Meir"], correct: "Margaret Thatcher" }
//       ]
//     }
//   };

//   for (const [key, quiz] of Object.entries(quizzes)) {
//     await db.collection('quizzes').doc(key).set(quiz);
//   }

//   console.log("✅ Uploaded static quizzes");
//   process.exit(0);
// }

// upload();

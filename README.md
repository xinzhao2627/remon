
# Remon - 
Remon is a fullstack web app that applies morphological analysis to japanese tatoeba sentences and categorize them based on kanji and vocabulary JLPT level.

In summary, it utilizes the following: 
- kuromoji a natural language processing / morphological analyzer library 
- database integration with built-in api
- web scraping for data processing and analyzing JLPT levels.

## Project Overview

- **Backend**: Node.js, Express, PostgreSQL (hosted on Neon)
- **Frontend**: React.js
- **Data Processing**: Python, Selenium, Pandas
- **Deployment**: Vercel (API and frontend)

### Features

- Tokenizes and analyzes Japanese sentences, identifying kanji and converting to Hiragana, Katakana, and Romaji.
- Retrieves kanji meanings, JLPT levels (N5 to N1), and parts of speech (noun, verb, adjective, etc.).
- Generates quizzes based on JLPT level for language practice.
- Hosts a large dataset with over 1.6 million rows, including kanji levels, dictionaries, and example sentences.

### Usage
- website: https://remonjp.vercel.app/
## remon-API
- https://www.postman.com/research-architect-39014665/remon/collection/hzldqdb/remon-api?action=share&creator=37418672

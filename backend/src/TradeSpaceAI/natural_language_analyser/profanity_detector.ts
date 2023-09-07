import Filter from 'bad-words';
import fs from 'fs';

let loaded_words: string[] = null;
let filter: Filter = null;

// active loader
export const load_words = () => {
    console.log("active loading profanity wordlist");
    filter = new Filter({ placeHolder: 'x' });
    loaded_words = fs.readFileSync("./src/TradeSpaceAI/natural_language_analyser/banned_wordlist.txt").toString().split("\n");
    filter.addWords(...loaded_words);
    console.log("active loading profanity wordlist");
}

// filter singleton
const get_filter = () => {
    if (filter == null) {
        filter = new Filter({ placeHolder: 'x' });
        loaded_words = fs.readFileSync("./src/TradeSpaceAI/natural_language_analyser/banned_wordlist.txt").toString().split("\n");
        filter.addWords(...loaded_words);
    }
    return filter;
}

export const detect_profanity = (text_to_check: string) => {
    const filter = get_filter();
    return filter.isProfane(text_to_check);
}
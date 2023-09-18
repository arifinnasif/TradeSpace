import Filter from 'bad-words';
import fs from 'fs';

let loaded_words: string[] = null;
let filter: Filter = null;

// active loader
export const load_words = () => {
    console.log("active loading profanity wordlist");
    filter = new Filter({ emptyList: false });
    loaded_words = fs.readFileSync("./src/TradeSpaceAI/natural_language_analyser/banned_wordlist.txt").toString().split("\n");
    loaded_words = loaded_words.filter((word) => word && word.length > 0);
    // console.log(loaded_words);
    filter.addWords(...loaded_words);
    console.log("active loaded profanity wordlist");
}

// filter singleton
const get_filter = () => {
    if (filter == null) {
        filter = new Filter({ emptyList: false });
        loaded_words = fs.readFileSync("./src/TradeSpaceAI/natural_language_analyser/banned_wordlist.txt").toString().split("\n");
        loaded_words = loaded_words.filter((word) => word && word.length > 0);
        filter.addWords(...loaded_words);
    }
    return filter;
}

export const detect_profanity = (text_to_check: string) => {
    const filter = get_filter();
    return filter.isProfane(text_to_check);
}
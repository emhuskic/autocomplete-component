import React, { ReactElement, useEffect, useState } from 'react';
import useAutocompleteData from '../hooks/useAutocompleteData';
import useOutsideClick from '../hooks/useOutsideClick';
import './AutocompleteInput.css';

const DEBOUNCING_TIMEOUT_DELAY = 200;
 
const divideIntoMatchingPart = (word: string, match: string): ReactElement => {
    const index = word.indexOf(match);
    if (index !== -1) {
        const before = word.slice(0, index);
        const after = word.slice(index + match.length);
        return <>{before}<span className='bold-text'>{match}</span>{after}</>;
    } else {
        return <>{word}</>;
    }
}

// If component is contained somewhere else
// we would want to get the value selected
interface AutocompleteInputProps {
    onValueChange?: Function;
};

const AutocompleteInput = ({ onValueChange }: AutocompleteInputProps) => {
    const [debounceTimeout, setDebounceTimeout] = useState(setTimeout(() => { }, 0))
    const [suggestions, setSuggestions]= useState<string[]>([]);
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(-1);
    const [inputValue, setInputValue] = useState("");
    const [inputValueToSearch, setInputValueToSearch] = useState("");
    const autocompleteData = useAutocompleteData(inputValueToSearch);

    useEffect(() => {
        if (autocompleteData.data) {
            setSuggestions(autocompleteData.data);
        } else {
            setSuggestions([]);
        }
    }, [autocompleteData.data]);

    const debounce = (debounceFunc: () => void) => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        setDebounceTimeout(setTimeout(debounceFunc, DEBOUNCING_TIMEOUT_DELAY));
    }

    const previousSuggestion = () => {
        if (currentSuggestionIndex > 0) {
            setCurrentSuggestionIndex(currentSuggestionIndex - 1);
        }
    };

    const nextSuggestion = () => {
        if (currentSuggestionIndex < suggestions.length - 1) {
            setCurrentSuggestionIndex(currentSuggestionIndex + 1)
        }
    };

    const selectSuggestion = (suggestion: number) => {
        if (suggestion > -1) {
            setInputValue(suggestions[suggestion])
        }
        clearSuggestions()
    };

    const clearSuggestions = () => {
        setCurrentSuggestionIndex(-1);
        setInputValueToSearch("");
        setSuggestions([]);
    };

    const onInputValueChange = (newValue: string) => {
        clearSuggestions();    
        setInputValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
        debounce(() => {
            setInputValueToSearch(newValue);
        });
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!e) return;
        switch (e.key) {
            case 'ArrowDown':
                nextSuggestion();
                break;
            case 'ArrowUp':
                previousSuggestion()
                break;
            case 'Enter':
                selectSuggestion(currentSuggestionIndex);
                break;
            case 'Escape':
                clearSuggestions();
                break;
            default:
                break;
        }
    }
    const containerRef = useOutsideClick(clearSuggestions);

    return (<div className="autocompleteInput" ref={containerRef}>
        <input 
            className="search"
            placeholder='Search'
            value={inputValue}
            onChange={e => {onInputValueChange(e.target.value)}}
            onFocus={() => setInputValueToSearch(inputValue)}
            onKeyDown={onKeyDown}
        />
        <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
                <li
                    className={`suggestion ${index === currentSuggestionIndex && " active-suggestion"}`}
                    key={index}
                    onClick={() => selectSuggestion(index)}
                >
                    <div>
                        {divideIntoMatchingPart(suggestion, inputValue)}
                    </div>
                </li>
            ))
            }
        </ul>
    </div>);
};

export default AutocompleteInput;

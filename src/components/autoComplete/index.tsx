// Autocomplete.tsx

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'
import './styles.css'

interface Option {
  img: string
  name: string
  id: number
}
interface AutocompleteProps {
  options: Option[]
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedValues, setSelectedValues] = useState<Option[]>([])
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [highlightedChip, setHighlightedChip] = useState<number>(0)

  const filterOptions = () => {
    const filtered = options.filter(
      (option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedValues.some(
          (selectedOption) => selectedOption.name === option.name
        )
    )
    setFilteredOptions(filtered)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const lowerCaseInputValue = inputValue.trim().toLowerCase()
      const lowerCaseOptions = options.map((option) =>
        option.name.toLowerCase()
      )
      const exactMatchIndex = lowerCaseOptions.indexOf(lowerCaseInputValue)
      if (exactMatchIndex !== -1) {
        setSelectedValues([...selectedValues, options[exactMatchIndex]])
        setInputValue('')
        setHighlightedIndex(-1)
        setHighlightedChip(0)
      } else if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredOptions.length
      ) {
        setSelectedValues([
          ...selectedValues,
          filteredOptions[highlightedIndex],
        ])
        setInputValue('')
        setHighlightedIndex(-1)
        setHighlightedChip(0)
      }
    } else if (event.key === 'ArrowUp') {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      )
    } else if (event.key === 'ArrowDown') {
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      )
    } else if (
      event.key === 'Backspace' &&
      inputValue === '' &&
      selectedValues.length > 0
    ) {
      if (!highlightedChip) {
        setHighlightedChip(selectedValues[selectedValues.length - 1].id)
      } else {
        const updatedValues = selectedValues.filter(
          (v) => v.id !== highlightedChip
        )
        setSelectedValues(updatedValues)
        setHighlightedChip(0)
      }
    }
  }

  const handleChipClick = (value: Option) => {
    const updatedValues = selectedValues.filter((v) => v.id !== value.id)
    setSelectedValues(updatedValues)
  }

  const handleOptionClick = (value: Option) => {
    setSelectedValues([...selectedValues, value])
    setInputValue('')
    setHighlightedChip(0)
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    setIsDropdownVisible(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false)
      setHighlightedIndex(-1)
      setHighlightedChip(0)
    }, 200)
  }

  useEffect(() => {
    filterOptions()
  }, [inputValue, selectedValues])

  return (
    <div className='autocomplete-container'>
      {selectedValues.map((value, index) => (
        <div
          key={value.id}
          className={`chip ${
            highlightedChip === value.id ? 'highlighted-chip' : ''
          }`}
          onClick={() => handleChipClick(value)}>
          <div className='chip-con'>
            <img
              src={require('../../assets/Images/github2.png')}
              alt={value.name}
            />
            <span>{value.name} </span>
          </div>
          <span className='remove-icon'>x</span>
        </div>
      ))}

      <div className='autocomplete-input-container'>
        <input
          className='autocomplete-input'
          type='text'
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
          placeholder='Type to search...'
        />
        {isDropdownVisible && (
          <ul className='autocomplete-options'>
            {filteredOptions.length === 0 ? (
              <li className='no-results'>No results found</li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className={index === highlightedIndex ? 'highlighted' : ''}>
                  <div className='option-con'>
                    <img
                      src={require('../../assets/Images/github2.png')}
                      alt={option.name}
                    />
                    <span>{option.name} </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Autocomplete

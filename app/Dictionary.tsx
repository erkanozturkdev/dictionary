"use client";

import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaChevronDown,
  FaEye,
  FaEyeSlash,
  FaMoon,
  FaSearch,
  FaSort,
  FaSun,
} from "react-icons/fa";
import { FixedSizeList as List } from "react-window";

import DictionaryItem from "./components/DictionaryItem";
import { useTheme } from "./contexts/ThemeContext";
import { data } from "./data";

export default function Dictionary() {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(true);
  const [currentData, setCurrentData] = useState(data);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showAllTranslations, setShowAllTranslations] = useState(false);
  const [isAlphabetOpen, setIsAlphabetOpen] = useState(false);

  const debouncedSearch = useCallback((value: string) => {
    const delayedSearch = debounce((searchValue: string) => {
      setSearchTerm(searchValue);
    }, 300);

    delayedSearch(value);
  }, []);

  const filteredData = useMemo(() => {
    return currentData.filter(
      (row) =>
        row.english.some((word) =>
          word.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        row.turkish.some((word) =>
          word.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm, currentData]);

  useEffect(() => {
    if (isSorted) {
      setCurrentData(
        [...data].sort((a, b) =>
          a.english[0]
            .toLowerCase()
            .localeCompare(b.english[0].toLowerCase(), "tr")
        )
      );
    } else {
      const shuffled = [...data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setCurrentData(shuffled);
    }
  }, [isSorted]);

  const finalData = useMemo(() => {
    return selectedLetter
      ? filteredData.filter((row) =>
          row.english.some((word) =>
            word.toLowerCase().startsWith(selectedLetter.toLowerCase())
          )
        )
      : filteredData;
  }, [filteredData, selectedLetter]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLetterClick = useCallback((letter: string) => {
    setSelectedLetter(letter);
  }, []);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const row = finalData[index];
      return (
        <div style={style}>
          <DictionaryItem
            english={row.english}
            turkish={row.turkish}
            defaultVisible={showAllTranslations}
          />
        </div>
      );
    },
    [finalData, showAllTranslations]
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        theme === "dark"
          ? "from-gray-900 via-gray-800 to-gray-900"
          : "from-blue-50 via-white to-blue-50"
      } p-8`}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div
          className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl ${
            theme === "dark"
              ? "bg-gray-800/50 text-white"
              : "bg-white/90 text-gray-900 border border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search word..."
                className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all ${
                  theme === "dark"
                    ? "bg-gray-900/50 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all flex items-center gap-2 ${
                  theme === "dark"
                    ? "bg-amber-400/90 hover:bg-amber-400"
                    : "bg-indigo-500/90 hover:bg-indigo-500"
                } text-white`}
              >
                {theme === "dark" ? (
                  <>
                    <FaSun className="text-sm" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="text-sm" />
                    <span>Dark</span>
                  </>
                )}
              </button>
              <button
                className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all ${
                  showAllTranslations
                    ? "bg-violet-500/90 hover:bg-violet-500"
                    : "bg-indigo-500/90 hover:bg-indigo-500"
                } text-white shadow-lg shadow-violet-500/10`}
                onClick={() => setShowAllTranslations(!showAllTranslations)}
              >
                {showAllTranslations ? (
                  <FaEyeSlash className="text-sm" />
                ) : (
                  <FaEye className="text-sm" />
                )}
                <span>{showAllTranslations ? "Hide" : "Show"}</span>
              </button>
              <button
                className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all ${
                  isSorted
                    ? "bg-teal-500/90 hover:bg-teal-500"
                    : "bg-rose-500/90 hover:bg-rose-500"
                } text-white shadow-lg shadow-teal-500/10`}
                onClick={() => setIsSorted(!isSorted)}
              >
                <FaSort className="text-sm" />
                <span>{isSorted ? "Shuffle" : "Sort"}</span>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="md:hidden">
              <button
                onClick={() => setIsAlphabetOpen(!isAlphabetOpen)}
                className={`w-full px-4 py-3 rounded-xl flex items-center justify-between ${
                  theme === "dark"
                    ? "bg-gray-800/50 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <span>
                  {selectedLetter
                    ? `Selected: ${selectedLetter}`
                    : "Select Letter"}
                </span>
                <FaChevronDown
                  className={`transition-transform ${
                    isAlphabetOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isAlphabetOpen && (
                <div
                  className={`mt-2 p-4 rounded-xl grid grid-cols-5 gap-2 ${
                    theme === "dark" ? "bg-gray-800/50" : "bg-white/90"
                  }`}
                >
                  {alphabet.map((letter) => (
                    <button
                      key={letter}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        selectedLetter === letter
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                          : theme === "dark"
                          ? "bg-gray-900/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                      }`}
                      onClick={() => {
                        handleLetterClick(letter);
                        setIsAlphabetOpen(false);
                      }}
                    >
                      {letter}
                    </button>
                  ))}
                  <button
                    className={`col-span-5 h-10 rounded-lg transition-all ${
                      selectedLetter === null
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : theme === "dark"
                        ? "bg-gray-900/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                    onClick={() => {
                      setSelectedLetter(null);
                      setIsAlphabetOpen(false);
                    }}
                  >
                    All
                  </button>
                </div>
              )}
            </div>

            <div className="hidden md:flex flex-wrap justify-center gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    selectedLetter === letter
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : theme === "dark"
                      ? "bg-gray-900/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                  onClick={() => handleLetterClick(letter)}
                >
                  {letter}
                </button>
              ))}
              <button
                className={`px-4 h-10 rounded-lg transition-all ${
                  selectedLetter === null
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : theme === "dark"
                    ? "bg-gray-900/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
                onClick={() => setSelectedLetter(null)}
              >
                All
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${
            theme === "dark" ? "bg-gray-800/50" : "bg-white/80"
          } backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden p-2`}
        >
          <List
            height={480}
            itemCount={finalData.length}
            itemSize={88}
            width="100%"
            className="custom-scrollbar"
          >
            {Row}
          </List>
        </div>
      </div>
    </div>
  );
}

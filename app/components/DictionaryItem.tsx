import { memo, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaVolumeUp } from "react-icons/fa";

import { useTheme } from "../contexts/ThemeContext";

interface DictionaryItemProps {
  english: string[];
  turkish: string[];
  defaultVisible: boolean;
}

const DictionaryItem = memo(function DictionaryItem({
  english,
  turkish,
  defaultVisible,
}: DictionaryItemProps) {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(defaultVisible);

  useEffect(() => {
    setIsVisible(defaultVisible);
  }, [defaultVisible]);

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`p-4 transition-colors border-b ${
        theme === "dark"
          ? "hover:bg-gray-700/30 border-gray-700/50 text-white"
          : "hover:bg-gray-50 border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => speakWord(english[0])}
            className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${
              theme === "dark"
                ? "bg-blue-600/10 text-blue-400 hover:bg-blue-600/20"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            <FaVolumeUp size={18} />
          </button>
          <span className="font-medium">{english.join(", ")}</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-sm transition-all ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } ${isVisible ? "opacity-100" : "opacity-50"}`}
          >
            {isVisible ? turkish.join(", ") : "• • • • • •"}
          </span>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className={`w-8 h-8 rounded-lg transition-all flex items-center justify-center ${
              theme === "dark"
                ? "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            }`}
          >
            {isVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
});

export default DictionaryItem;

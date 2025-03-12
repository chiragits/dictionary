import React, { useState } from "react";
import { Search } from "lucide-react";

export default function DictionaryApp() {
  const [word, setWord] = useState("");
  const [Data, setData] = useState(null);

  function print(e) {
    setWord(e.target.value);
  }

  async function func(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data[0]);
      setWord(""); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Dictionary App
          </h1>
          
        </div>

        <form className="mb-8" onSubmit={func}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                onChange={print}
                value={word} 
                type="text"
                placeholder="Enter a word"
                className="border border-gray-300 rounded-lg pl-10 h-12 text-lg w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg h-12 px-8 text-lg hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </form>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 min-h-[300px]">
          {Data ? (
            <div className="text-left w-full">
              <h2 className="text-3xl font-bold text-white dark:text-white bg-blue-600 py-2 px-4 rounded-lg inline-block">
                {Data.word}
              </h2>

              <p className="text-lg text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg mt-4">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Meaning:
                </span>{" "}
                {Data.meanings[0]?.definitions[0]?.definition || "No definition available"}
              </p>

              {Data.meanings[0]?.synonyms?.length > 0 && (
                <p className="text-lg text-gray-700 dark:text-gray-300 border-l-4 border-green-500 pl-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg mt-4">
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Synonyms:
                  </span>{" "}
                  {Data.meanings[0].synonyms.slice(0, 5).join(", ")}
                </p>
              )}
            </div>
          ) : (
            <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
              Enter a word to get its meaning
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
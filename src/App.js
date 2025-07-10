import { useState, useRef, useEffect } from "react";
import { LuSend, LuUser, LuBot, LuFileText, LuLoader } from "react-icons/lu";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const initialQuery =
    "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988? If so, how much?";
  const [query, setQuery] = useState(initialQuery);
  const [scrolledDown, setScrolledDown] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const simulateApiCall = async (_userQuery) => {
    const response = {
      answer:
        "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.",
      citations: [
        {
          text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.” (Para 7 of the document)",
          source: "Dani_Devi_v_Pritam_Singh.pdf",
          link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
        },
      ],
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage = { type: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setQuery("");

    const botResponse = await simulateApiCall(query);
    const botMessage = { type: "bot", ...botResponse };
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col font-sans">
      <header
        className={`
    p-4 border-b border-gray-700 shadow-md sticky top-0 z-10
    transition-opacity duration-500 ease-in-out
    ${scrolledDown ? "opacity-0 hover:opacity-100" : "opacity-100"}
    bg-gray-800
  `}
      >
        <h1 className="text-2xl font-bold text-center text-gray-100">
          Lexi Legal Assistant
        </h1>
      </header>

      <main className="flex-1 flex flex-col p-4 overflow-y-auto">
        <div className="flex-1 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${msg.type === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {msg.type === "bot" && (
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <LuBot size={20} />
                </div>
              )}
              <div
                className={`max-w-2xl p-4 rounded-lg ${msg.type === "user" ? "bg-blue-600" : "bg-gray-700"
                  }`}
              >
                {msg.type === "user" ? (
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                ) : (
                  <div className="space-y-4">
                    <p className="whitespace-pre-wrap">{msg.answer}</p>
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="space-y-3 pt-3 border-t border-gray-600">
                        <h3 className="font-semibold text-sm text-gray-300">
                          Citations:
                        </h3>
                        {msg.citations.map((citation, cIndex) => (
                          <div
                            key={cIndex}
                            className="bg-gray-900/50 p-3 rounded-lg"
                          >
                            <blockquote className="border-l-4 border-indigo-400 pl-3 text-gray-300 text-sm italic">
                              "{citation.text}"
                            </blockquote>
                            <a
                              href={citation.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                            >
                              <LuFileText size={16} />
                              <span>{citation.source}</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {msg.type === "user" && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <LuUser size={20} />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4 justify-start">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <LuBot size={20} />
              </div>
              <div className="bg-gray-700 p-4 rounded-lg flex items-center space-x-2">
                <LuLoader className="animate-spin" size={20} />
                <span className="text-sm text-gray-300">
                  Generating answer...
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="p-4 border-t border-gray-700 bg-gray-800">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-gray-700 rounded-2xl p-2 space-y-2 items-center"
        >
          <textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a legal question..."
            className="w-full flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none p-2 max-h-40 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#6b7280 #374151",
            }}
            rows="1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="ml-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-full p-3 flex items-center justify-center transition-colors self-end"
          >
            {isLoading ? (
              <LuLoader className="animate-spin" size={20} />
            ) : (
              <LuSend size={20} />
            )}
          </button>
        </form>
      </footer>
    </div>
  );
}

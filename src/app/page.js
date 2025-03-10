"use client";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";


/**
 * Home component that provides a user interface for a search functionality.
 * 
 * This component renders a form with a textarea for user input and displays
 * the response received from the API. It manages loading states, form submission,
 * and resetting functionality.
 * 
 * @returns {JSX.Element} The rendered Home component
 */
export default function Home() {

  const [text, setText] = useState("");
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); 
  const [disabled, setDisabled] = useState(false);

  /**
   * Handles the search form submission.
   * 
   * This function is executed when the user submits the search form.
   * It prevents the default form behavior, displays a loading state,
   * makes a request to the search API, and updates the state with
   * the received response.
   * 
   * @param {Event} e - The form submission event
   * @returns {Promise<void>} - A promise that resolves when the request is completed
  */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página
    setLoading(true);
    setDisabled(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text }),
      });

      const data = await res.json();
      setResponse(data.response);

    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Something went wrong. Please try again.");

    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

 
  /**
   * Resets the form and response to their initial states.
   * 
   * This function clears both the input text and any displayed response
   * when the user clicks the reset button.
   * 
   * @returns {void}
   */
  const handleReset = () => {
    setText("");
    setResponse("");
  };

    return ( 
      <div className="min-h-screen flex flex-col items-center  justify-center bg-black text-white p-6">
        {response && (
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-3/4 border border-gray-700 text-center mb-4">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">Response:</h2>
            <p className="text-gray-300">{response}</p>
          </div>
        )}
  
        <form
          onSubmit={handleSubmit}
          className={`bg-gray-900 p-8 rounded-xl shadow-lg  w-3/4 border border-gray-700 mt-${response ? "6" : "0"}`}
        > 
        <div className="flex justify-between items-center mb-3">
          <label htmlFor="input" className="block text-lg font-medium text-gray-400 mb-3">
              How can I help you?
          </label>
          <button
              type="button"
              onClick={handleReset}
              className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-1"
          >
            <RefreshCcw />
          </button>
        </div>
          
          <textarea
            id="input"
            className="w-full p-3 bg-black text-white border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={4}
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          {/* Submit button */}
          <button
            type="submit"
            disabled={disabled}
            className="w-full mt-5 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-purple-500/50"
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    );
  }

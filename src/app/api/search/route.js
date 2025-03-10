import { SerpAPI } from "@langchain/community/tools/serpapi";
import { Ollama } from 'ollama';
import ollama from "ollama";


/**
 * API Route Handler for web search processing
 * This function processes incoming search queries, fetches results from SerpAPI,
 * and generates a response using the Ollama LLM.
 * 
 * @param {Request} req - The incoming HTTP request object
 * @returns {Response} JSON response with the generated answer or error message
 */
export async function POST(req) {
  if (req.method === 'POST') {
    try {
        const { input } = await req.json();

        if (!input || input.trim() === "") {
          return new Response(JSON.stringify({ error: "Input cannot be empty." }), { status: 400 });
        }
      
        console.log('Received input: ', input); 

        // Initialize SerpAPI search tool with API key from environment variables
        const tool = new SerpAPI(
          process.env.SERPAPI_KEY
        );
      
        // Execute the web search using the provided query
        const searchResults = await tool.invoke({
            input: input,
        });
        console.log("Search results:", JSON.stringify(searchResults, null, 2));
        
        // Parse results if they're in string format
        let parsedResults;
        try {
        parsedResults = typeof searchResults === 'string' ? JSON.parse(searchResults) : searchResults;
        } catch (error) {
        console.error("Error parsing results:", error);
        parsedResults = searchResults; // Use original results if parsing fails
        }

        console.log("Parsed Results:", parsedResults); 

        // Validate search results
        const hasValidResults = parsedResults && 
        (Array.isArray(parsedResults) && parsedResults.length > 0) || 
        (typeof parsedResults === 'object' && Object.keys(parsedResults).length > 0);

        if (!hasValidResults) {
        console.log('Result: No relevant results found');
        } 
          
        console.log("Data to send to Ollama:", parsedResults);

        const formattedData = JSON.stringify(parsedResults, null, 2); 

        // Generate response using Ollama LLM
        const ollamaResponse = await ollama.generate({
            model: "llama3.2",
            prompt: `Use this information to answer the following question: "${input}". Information found: ${formattedData}`,
        });
    
        return new Response(JSON.stringify({ response: ollamaResponse.response }), { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ error: `Error processing query: ${error.message}` }),
            { status: 500 }
        );
    }
  }
}

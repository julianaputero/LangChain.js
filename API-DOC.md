
## Request and Response Format

- **ENDPOINT**: `/api/search`

### 1. Request:
   - **EndPoint**: `/api/search`
   - **Method**: `POST`
   - **Headers**: `{ "Content-Type": "application/json" }`
   - **Body**:  

     ```json
     {
       "input": "What is the weather today?"
     }
     ```

   Consult documentation: [MDN Web API Request](https://developer.mozilla.org/es/docs/Web/API/Request)
       
### 2. Response:

- **If the status is `200`**:  
  ```json
  {
    "response": "generated response"
  }
  ```
- **If the status is `400`**:  
  ```json
  {
    "error": "Input cannot be empty."
  }
  ```
- **If the status is `500`**:  
```json
  {
    "error": "Error processing query: [message]"
  }
```

## The web search tool used.
    The web search tool used is SERPAPI.
    It is initialized with an API key stored in .env (SERPAPI_KEY)
    Using the invoke method, it performs web scraping. Return search results from various search engines (google for example)
    Consult documentation: https://js.langchain.com/docs/integrations/tools/serpapi/

## How the LLM is integrated.

### Installing Ollama 

1. Visit the official repository on GitHub: [Ollama](https://github.com/ollama/ollama). 
2. Once installed, you can run and chat with Llama 3.2 using the following command:
- ollama run llama3.2

### Integrating Ollama in Next
1. The prompt follows this structure: Use this information to answer the following question: "[query]". Information found: [search results]
2. Ollama processes this prompt and generates a natural language response
3. Consult documentation: https://dev.to/asaoluelijah/how-to-integrate-ollama-in-nextjs-5aa7



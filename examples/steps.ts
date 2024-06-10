const API_URL = "https://api.data2json.xyz/v1";

export const exampleCodeForStep2 = `
const API_KEY = "YOUR_API_KEY";
const API_URL = "${API_URL}";

const payload = {
  data: \`While hiking in the mountains, I encountered a stray dog. The dog had a golden coat and seemed to be around 20-25 
         kilograms. It resembled a Golden Retriever.\`

  format: {
    dog: {
      breed: { type: "string" },
      weight: { type: "number", range: true }
    }
  }
}

await fetch(API_URL, {
  method: "POST",
  headers: {
    "X-API-KEY": API_KEY,
  },
  body: JSON.stringify(payload)
})
  .then(res => res.json())
  .then(data => console.log(data));
`;

export const exampleCodeForStep3 = `curl -X POST ${API_URL} \\     
  -H "X-API-KEY: {{YOUR_API_KEY}}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": "The dog had a golden coat and seemed to be around 20-25 kilograms. It resembled a Golden Retriever.",
    "format": {
      "dog": {
        "breed": { "type": "string" },
        "weight": { 
          "type": "object", 
          "min": { "type": "number" }, 
          "max": { "type": "number" } 
        }
      }
    }
  }'
`;
export const landingPageExample = `curl -X POST ${API_URL} \\ 
  -H "X-API-KEY: {{YOUR_API_KEY}}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": "[{\\"id\\":1,\\"name\\":\\"Wireless Mouse\\",\\"description\\":\\"A smooth and responsive wireless mouse.\\",\\"price\\":25.99,\\"category\\":\\"Electronics\\",\\"in_stock\\":true},{\\"id\\":3,\\"name\\":\\"Mechanical Keyboard\\",\\"description\\":\\"A durable mechanical keyboard with customizable backlight.\\",\\"price\\":49.99,\\"category\\":\\"Computers\\",\\"in_stock\\":true}]",
    "format": {
      "products": [
        {
          "price": "\${{ price }}",
          "name": "{{name}} - <truncate 0...48>{{description}}..."
        }
      ],
      "stock_cost": "<sumof as string>\${{ price }}"
    }
  }'
`;

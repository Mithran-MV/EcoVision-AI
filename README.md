
# Green Finance Optimization Platform Backend

This is the backend for the **Green Finance Optimization Platform**, built using Node.js, Express, MySQL, and OpenAI's GPT API. It provides RESTful APIs for project management, ESG scoring, resource optimization, and AI-powered insights.

## Features
- Add and manage projects with ESG metrics.
- Calculate ESG scores using OpenAI GPT.
- Optimize resource allocation for maximum impact.
- Fetch project details and insights.
- AI-powered conversational interface for project suggestions.

## Prerequisites
1. **Node.js** and **npm** installed on your system.
2. **MySQL Database** set up and running.
3. **OpenAI API Key** for GPT integration.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-name.git
   cd your-repository-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_DATABASE=your-database-name
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Start the server:
   ```bash
   node app.js
   ```

5. The server will be running at `http://localhost:3000`.

## API Endpoints

### **1. Add a New Project**
- **URL:** `/projects`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Project Name",
    "description": "Project Description",
    "location": "Location",
    "budget": 100000,
    "esgMetrics": {
      "environment": 80,
      "social": 70,
      "governance": 90
    }
  }
  ```
- **Response:**
  ```json
  {
    "message": "Project added successfully",
    "projectId": 1
  }
  ```

### **2. Fetch All Projects**
- **URL:** `/projects`
- **Method:** `GET`
- **Query Parameters:** (Optional)
  - `location`: Filter projects by location.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Green Energy Plant",
      "description": "A renewable energy project.",
      "location": "Chennai",
      "budget": 200000,
      "esgMetrics": "{\"environment\":80,\"social\":70,\"governance\":90}",
      "esgScore": null
    }
  ]
  ```

### **3. Calculate ESG Score**
- **URL:** `/projects/:id/esg-score`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "description": "Project Description",
    "esgMetrics": {
      "environment": 80,
      "social": 70,
      "governance": 90
    }
  }
  ```
- **Response:**
  ```json
  {
    "message": "ESG score calculated successfully",
    "esgScore": 85
  }
  ```

### **4. Optimize Resource Allocation**
- **URL:** `/optimize`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "budget": 500000,
    "riskTolerance": "low"
  }
  ```
- **Response:**
  ```json
  {
    "optimizedProjects": [
      {
        "id": 1,
        "name": "Green Energy Plant",
        "esg_score": 85,
        "budget": 200000
      }
    ],
    "remainingBudget": 300000,
    "message": "Resource allocation optimized successfully"
  }
  ```

### **5. Chat with GPT**
- **URL:** `/chat`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "query": "What are the best projects for investment?"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Based on your query, here are some recommendations for sustainable investments."
  }
  ```

## Database Schema

### `projects` Table
| Column       | Type       | Description                 |
|--------------|------------|-----------------------------|
| `id`         | INT        | Primary Key                 |
| `name`       | VARCHAR    | Project name                |
| `description`| TEXT       | Project description         |
| `location`   | VARCHAR    | Project location            |
| `budget`     | FLOAT      | Project budget              |
| `esg_metrics`| JSON       | JSON of ESG metrics         |
| `esg_score`  | FLOAT      | Calculated ESG score        |

### `interactions` Table
| Column       | Type       | Description                 |
|--------------|------------|-----------------------------|
| `id`         | INT        | Primary Key                 |
| `user_id`    | INT        | ID of the user interacting  |
| `query`      | TEXT       | User query                  |
| `response`   | JSON       | Response logged             |

## Usage

1. Use a REST client like **Postman** or **Insomnia** to test the endpoints.
2. Set up a MySQL database with the schema provided above.
3. Update `.env` file with your credentials.

## Dependencies
- **express:** For creating REST APIs.
- **mysql2:** For interacting with the MySQL database.
- **body-parser:** To parse JSON request bodies.
- **dotenv:** To manage environment variables.
- **OpenAI:** To interact with GPT API.

## Contributing
Feel free to open issues or submit pull requests for improvements.

## License
This project is licensed under the MIT License.
```

Let me know if you need any additional modifications or sections!

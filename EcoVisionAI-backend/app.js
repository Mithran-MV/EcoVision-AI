import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Add a New Project
app.post("/projects", (req, res) => {
    const { name, description, location, budget, esgMetrics } = req.body;
    const query = `INSERT INTO projects (name, description, location, budget, esg_metrics) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [name, description, location, budget, JSON.stringify(esgMetrics)], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error adding project", details: err });
        } else {
            res.status(201).json({ message: "Project added successfully", projectId: results.insertId });
        }
    });
});

// Fetch All Projects
app.get("/projects", (req, res) => {
    const { location } = req.query;
    const query = `SELECT * FROM projects WHERE location = ? OR ? IS NULL`;
    db.query(query, [location, location], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error fetching projects", details: err });
        } else {
            res.json(results);
        }
    });
});

// Calculate ESG Score for a Project
app.post("/projects/:id/esg-score", async (req, res) => {
    const { id } = req.params;
    const { description, esgMetrics } = req.body;

    try {
        const prompt = `
            You are an AI expert in sustainability. Calculate the ESG score based on the provided project description:
            "${description}" and ESG metrics: ${JSON.stringify(esgMetrics)}.
            Assign a score between 0 and 100.
        `;
        const gptResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an ESG scoring assistant." },
                { role: "user", content: prompt },
            ],
            max_tokens: 50,
            temperature: 0.7,
        });

        const esgScore = gptResponse?.choices?.[0]?.message?.content?.trim() || "50";

        const updateQuery = `UPDATE projects SET esg_score = ? WHERE id = ?`;
        db.query(updateQuery, [esgScore, id], (err) => {
            if (err) {
                res.status(500).json({ error: "Error updating ESG score", details: err });
            } else {
                res.json({ message: "ESG score calculated successfully", esgScore });
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Error calculating ESG score", details: err.message });
    }
});

// Optimize Resource Allocation
app.post("/optimize", (req, res) => {
    const { budget, riskTolerance } = req.body;

    const query = `
        SELECT id, name, esg_score, budget 
        FROM projects 
        WHERE budget <= ? 
        ORDER BY esg_score DESC
    `;
    db.query(query, [budget], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error optimizing resources", details: err });
        } else {
            const optimizedProjects = [];
            let remainingBudget = budget;

            results.forEach((project) => {
                if (project.budget <= remainingBudget) {
                    optimizedProjects.push(project);
                    remainingBudget -= project.budget;
                }
            });

            res.json({
                optimizedProjects,
                remainingBudget,
                message: "Resource allocation optimized successfully",
            });
        }
    });
});

// Chat with GPT for Project Insights
app.post("/chat", async (req, res) => {
    const { query } = req.body;

    const prompt = `
        You are an AI sustainability assistant. Based on the user's query "${query}", provide insights or suggestions related to green finance investments.
    `;

    try {
        const gptResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant for green finance optimization." },
                { role: "user", content: prompt },
            ],
            max_tokens: 100,
            temperature: 0.7,
        });

        const message = gptResponse?.choices?.[0]?.message?.content || "I couldn't find any relevant suggestions.";

        res.json({ message });
    } catch (err) {
        res.status(500).json({ error: "Error generating GPT response", details: err.message });
    }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

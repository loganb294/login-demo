// Import the Express module
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/v1/user.js';
import authRoutes from "./routes/v1/authRoutes.js"
import cors from "cors"



// Create an Express application
const app = express();
app.use(cors())


// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management System API",
      version: "1.0.0",
      description: "A student management system API",
      contact: {
        name: "l",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/v1/*.js"],
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use the routes module
app.use('/api/users', userRoutes);
app.use("/auth", authRoutes);


// Setup swagger-ui after swaggerDocs is initialized
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/products/:id', function (_req, res) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}. Visit http://localhost:${PORT}/api-docs`);
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;

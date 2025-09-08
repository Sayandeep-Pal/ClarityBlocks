// server/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Add size limit for large contracts

// ---------------------
// Debugging / Linting
// ---------------------
function validateClarityCode(clarityCode) {
  const errors = [];
  const warnings = [];

  // --- Basic sanity checks ---
  if (!clarityCode.includes("(define")) {
    errors.push("Contract must contain at least one define statement.");
  }

  // Check for unbalanced parentheses
  const openCount = (clarityCode.match(/\(/g) || []).length;
  const closeCount = (clarityCode.match(/\)/g) || []).length;
  if (openCount !== closeCount) {
    errors.push("Unbalanced parentheses detected.");
  }

  // --- Operator misuse ---
  if (/>[a-zA-Z]/.test(clarityCode)) {
    errors.push("Invalid operator usage. Use (> var uX) instead of >var uX.");
  }

  // --- Return type rules ---
  if (/\(define-public/.test(clarityCode) && !/\(response /.test(clarityCode)) {
    errors.push("Public functions must return a response type.");
  }

  if (/\(response bool/.test(clarityCode)) {
    if (/\(ok\s*".*"\)/.test(clarityCode)) {
      errors.push("Response type mismatch: expected bool, got string.");
    }
    if (/\(ok\s*u\d+\)/.test(clarityCode)) {
      errors.push("Response type mismatch: expected bool, got uint.");
    }
  }

  if (/\(err\s*".*"\)/.test(clarityCode)) {
    errors.push("Error values must be uint (e.g., (err u100)), not strings.");
  }

  // --- Constants ---
  if (/\(ok\s+\d+\)/.test(clarityCode)) {
    errors.push("Numeric constants must be prefixed with 'u'.");
  }
  if (/\(err\s+\d+\)/.test(clarityCode)) {
    errors.push("Error codes must be unsigned integers (e.g., (err u100)).");
  }
  if (/[\+\-]?\d+\.\d+/.test(clarityCode)) {
    errors.push("Floating point numbers are not supported in Clarity.");
  }
  if (/-\d+/.test(clarityCode)) {
    errors.push("Negative numbers are not supported in Clarity.");
  }

  // --- Reserved keywords ---
  const reserved = [
    "define",
    "begin",
    "if",
    "ok",
    "err",
    "map-get?",
    "unwrap!",
    "unwrap-panic",
    "print",
    "try!",
    "let",
  ];
  reserved.forEach((word) => {
    const regex = new RegExp(`\\(define-public\\s*\\(${word}\\s`, "g");
    if (regex.test(clarityCode)) {
      errors.push(
        `Reserved keyword "${word}" cannot be used as a variable or function name.`
      );
    }
  });

  // --- Warnings for bad practices ---
  if (/print/.test(clarityCode)) {
    warnings.push("Avoid using print in production contracts.");
  }
  if (/unwrap-panic/.test(clarityCode)) {
    warnings.push("unwrap-panic may crash your contract, avoid using it.");
  }
  if (/default-to/.test(clarityCode)) {
    warnings.push("Consider handling errors explicitly instead of default-to.");
  }

  return { errors, warnings };
}

// Helper function to ensure directory structure exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// ---------------------
// Endpoints
// ---------------------

// Debugging endpoint
app.post("/api/debug-contract", (req, res) => {
  const { clarityCode } = req.body;

  if (!clarityCode) {
    return res.status(400).json({ status: "error", error: "No code provided" });
  }

  try {
    // Run our custom validation first
    const validation = validateClarityCode(clarityCode);

    // Ensure directory structure exists
    const tempDir = path.join(__dirname, "temp", "contracts");
    ensureDirectoryExists(tempDir);

    const contractPath = path.join(tempDir, "temp.clar");

    // Write the contract file
    fs.writeFileSync(contractPath, clarityCode, "utf-8");

    // Check if clarinet project directory exists
    const clarinetDir = path.join(__dirname, "temp");
    if (!fs.existsSync(clarinetDir)) {
      return res.json({
        status: "error",
        error:
          "Clarinet project directory not found. Please initialize a clarinet project first.",
        validation,
      });
    }

    // Run clarinet check inside the clarinet project
    exec(
      "clarinet check",
      {
        cwd: clarinetDir,
        timeout: 30000, // 30 second timeout
      },
      (err, stdout, stderr) => {
        if (err) {
          // Check if it's a timeout error
          if (err.killed) {
            return res.json({
              status: "error",
              error: "Compilation timeout",
              validation,
            });
          }

          return res.json({
            status: "error",
            compilerErrors: stderr || stdout || err.message,
            validation,
          });
        }

        res.json({
          status: "success",
          compilerOutput: stdout,
          validation,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
});

// Validate contract endpoint (uses our custom validation)
app.post("/api/validate-contract", (req, res) => {
  const { clarityCode } = req.body;

  if (!clarityCode) {
    return res.status(400).json({ status: "error", error: "No code provided" });
  }

  try {
    const validation = validateClarityCode(clarityCode);
    res.json({
      status: validation.errors.length > 0 ? "error" : "success",
      validation,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Smart Contract Builder Backend is running!",
    version: "1.0.0",
    endpoints: [
      "POST /api/debug-contract",
      "POST /api/validate-contract",
      "GET /health",
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    error: "Something went wrong!",
  });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    error: "Endpoint not found",
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log(`Environment: ${"development"}`);
});

// module.exports = app; // Export for testing

# ClarityBlocks

A visual drag-and-drop interface for building Clarity smart contracts for the Stacks blockchain. Create, validate, and debug Clarity contracts using an intuitive block-based programming interface.



## 🌟 Features

- **Visual Contract Building**: Drag-and-drop interface for creating Clarity smart contracts
- **Real-time Code Generation**: Instantly see the generated Clarity code as you build
- **Live Validation**: Get immediate feedback on contract validity
- **Contract Analysis**: Built-in debugging and compilation checks
- **Export Functionality**: Export your contracts directly to `.clar` files
- **Syntax Highlighting**: Beautiful code presentation with syntax highlighting
- **Component Library**: Rich set of pre-built Clarity components including:
  - Module definitions
  - Public/Private/Read-only functions
  - Data variables and maps
  - Constants and let bindings
  - Control flow (if-else conditions)
  - Contract calls
  - Map operations (get, set, delete)
  - Variable operations
  - Assert statements
  - Return statements (ok/err)
  - Trait implementations

## 🔧 Tech Stack

### Frontend (Client)
- React.js
- Vite
- React Flow (for drag-and-drop interface)
- Tailwind CSS
- react-syntax-highlighter

### Backend (Server)
- Node.js
- Express
- Clarinet (for contract validation and debugging)
- Docker support

## 📦 Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── nodes/     # Block components for different Clarity elements
│   │   │   └── ...
│   │   ├── util/          # Utility functions
│   │   └── ...
│   └── ...
└── server/                 # Backend application
    ├── temp/              # Temporary files for contract validation
    │   ├── contracts/     # Generated Clarity contracts
    │   └── tests/        # Contract tests
    └── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm
- Docker (for running the backend)
- Clarinet (for Clarity contract validation)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sayandeep-Pal/ClarityBlocks.git
cd ClarityBlocks
```

2. Install frontend dependencies:
```bash
cd client
pnpm install
```

3. Install backend dependencies:
```bash
cd ../server
pnpm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
docker build -t clarity-backend .
docker run -p 3000:3000 clarity-backend
```

2. Start the frontend development server:
```bash
cd client
pnpm run dev
```

The application will be available at `http://localhost:5173`

## 🔨 Usage

1. **Creating a Contract**:
   - Drag components from the sidebar onto the canvas
   - Connect the blocks to create contract logic
   - View the generated Clarity code in real-time

2. **Validating Contracts**:
   - The code viewer automatically validates your contract
   - View errors and warnings in the analysis panel
   - Check compilation status and debug information

3. **Exporting**:
   - Use the "Export" button to save your contract as a `.clar` file
   - Copy the generated code using the "Copy" button

## 🔜 Upcoming Features

- Contract deployment directly from the interface
- Additional block components
- Template library
- Contract testing interface
- Multi-contract project support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- [Sayandeep Pal](https://github.com/Sayandeep-Pal)

## 🙏 Acknowledgments

- [Stacks Foundation](https://stacks.org)
- [Clarity Language](https://clarity-lang.org)
- [Clarinet](https://github.com/hirosystems/clarinet)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

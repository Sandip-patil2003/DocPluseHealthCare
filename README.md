# DocPluse Healthcare - Hospital Management System

A full-stack web application for hospital management, built with **.NET Core** backend and **React + Vite** frontend.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

## 📁 Project Structure

```
DocPluseHealthCare/
├── HospitalApi/              # .NET Core Backend
│   ├── HospitalApi/          # Main API project
│   │   ├── Controllers/      # API Controllers
│   │   ├── Models/           # Data Models
│   │   ├── Services/         # Business Logic Services
│   │   ├── Program.cs        # Application startup
│   │   └── appsettings.json  # Configuration
│   └── HospitalApi.sln       # Solution file
├── HospitalUi/               # React + Vite Frontend
│   └── Hospital_Ui/
│       ├── src/              # React components and pages
│       ├── public/           # Static assets
│       ├── package.json      # Dependencies
│       └── vite.config.js    # Vite configuration
└── README.md                 # This file
```

## 🛠 Prerequisites

### Backend
- **[.NET 8.0](https://dotnet.microsoft.com/download)** or later
- **Visual Studio 2022** (recommended) or **Visual Studio Code** with C# extension

### Frontend
- **[Node.js](https://nodejs.org/)** 16.0 or later
- **npm** (comes with Node.js) or **yarn**

## 🚀 Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd DocPluseHealthCare
```

## 🔧 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd HospitalApi/HospitalApi
```

### 2. Restore NuGet Packages

```bash
dotnet restore
```

### 3. Configure Database (if applicable)

Update `appsettings.json` with your database connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=your-server;Database=HospitalDb;User Id=your-user;Password=your-password;"
  }
}
```

### 4. Run Migrations (if using Entity Framework)

```bash
dotnet ef database update
```

### 5. Build the Backend

```bash
dotnet build
```

## 💻 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd HospitalUi/Hospital_Ui
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure API Endpoint

Update your API base URL in the environment configuration file:

```bash
# Create .env.local file
echo VITE_API_URL=http://localhost:5000 > .env.local
```

## ▶️ Running the Application

### Run Backend

From `HospitalApi/HospitalApi` directory:

```bash
dotnet run
```

The API will be available at: `https://localhost:5001` or `http://localhost:5000`

### Run Frontend (Development)

From `HospitalUi/Hospital_Ui` directory:

```bash
npm run dev
# or
yarn dev
```

The application will be available at: `http://localhost:5173`

### Build Frontend for Production

```bash
npm run build
# or
yarn build
```

The production build will be in the `dist/` folder.

## 📚 API Documentation

Visit `HospitalApi/HospitalApi.http` for API endpoint examples, or use Swagger if enabled:

```
http://localhost:5000/swagger
```

## 📝 Configuration

### Backend Configuration
- **appsettings.json** - Production settings
- **appsettings.Development.json** - Development settings (ignored in git)

### Frontend Configuration
- **.env** - Default environment variables
- **.env.local** - Local overrides (ignored in git)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to the branch
5. Open a Pull Request

## 📄 License

(Add your license here)

## 🆘 Troubleshooting

### Backend won't start
- Ensure .NET 8.0+ is installed: `dotnet --version`
- Check database connection string
- Run `dotnet restore` to restore packages

### Frontend build fails
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Clear npm cache: `npm cache clean --force`

### CORS errors
- Ensure backend CORS is properly configured in `Program.cs`
- Verify frontend API URL matches backend address

---

**For more information, refer to the individual README files in each folder.**

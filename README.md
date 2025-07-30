# Orvio - Project Management Web Application

Orvio is a comprehensive project management web application designed to help teams organize, track, and manage projects efficiently. Built with modern web technologies, it provides a robust platform for creating boards with stages, managing tasks, and collaborating with team members.

## 🚀 Features

### Project Management
- **Project Creation & Setup**: Multi-step project creation process with detailed project information
- **Project Types**: Support for different project types with customizable briefs and requirements
- **Project Status Tracking**: Monitor projects through active, upcoming, and completed phases
- **Budget Management**: Track project budgets and financial information
- **File Management**: Upload and organize project files and documents

### Board & Task Management
- **Kanban Boards**: Visual board interface with customizable stages
- **Task Management**: Create, assign, and track tasks with detailed information
- **Task Status**: Track tasks through todo, in-progress, and done states
- **Task Dependencies**: Set up task dependencies and relationships
- **Timeline Management**: Set start and end dates for tasks and projects

### User & Collaboration
- **User Management**: Comprehensive user profiles with role-based access
- **Client Management**: Separate client and collaborator management systems
- **Team Collaboration**: Assign multiple collaborators to tasks and projects
- **Activity Tracking**: Monitor project and task activities with detailed logs
- **Vendor Management**: Invite and manage external vendors with setup workflows

### Authentication & Security
- **User Authentication**: Secure login system with password management
- **Password Reset**: Forgot password functionality with email verification
- **Profile Management**: User profile editing and password changes
- **Session Management**: Secure session handling and logout functionality

### Additional Features
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Updates**: Live status updates and notifications
- **Search & Filtering**: Advanced search and filtering capabilities
- **File Upload**: Drag-and-drop file upload with progress tracking
- **Notifications**: In-app notification system for updates and alerts

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with modern features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Mantine UI**: Component library for consistent design
- **Framer Motion**: Smooth animations and transitions

### State Management & Data Fetching
- **Zustand**: Lightweight state management
- **React Query (TanStack Query)**: Server state management and caching
- **React Hook Form**: Form handling with validation

### Development Tools
- **ESLint**: Code linting and formatting
- **Jest**: Testing framework with React Testing Library
- **PostCSS**: CSS processing with Tailwind and Mantine

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Orvio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Development Notes
- **Login**: Use any email and password combination to enter the site during development
- **Hot Reload**: The development server supports hot reloading for instant feedback
- **Turbopack**: Uses Next.js Turbopack for faster development builds

## 🧪 Testing

Run the test suite with:
```bash
npm test
npm run test:watch    # Watch mode
npm run test:cov      # Coverage report
npm run test:failures # Only failed tests
```

## 📁 Project Structure

```
Orvio/
├── app/                    # Next.js App Router pages
│   ├── (activity)/        # Activity tracking routes
│   ├── (auth)/           # Authentication routes
│   ├── (board)/          # Board management routes
│   ├── (projects)/       # Project management routes
│   ├── (stages)/         # Stage management routes
│   ├── (users)/          # User management routes
│   └── (vendors)/        # Vendor management routes
├── components/            # Reusable UI components
├── features/             # Feature-based modules
│   ├── activity/         # Activity tracking
│   ├── auth/            # Authentication
│   ├── board/           # Board management
│   ├── projects/        # Project management
│   ├── stages/          # Stage management
│   ├── users/           # User management
│   └── vendors/         # Vendor management
├── hooks/               # Custom React hooks
├── store/               # Zustand stores
├── utils/               # Utility functions
└── config.ts           # Application configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:failures` - Run only failed tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Orvio** - Streamlining project management for modern teams.

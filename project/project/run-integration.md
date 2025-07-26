# Frontend-Backend Integration Guide

## ✅ What's Been Integrated

### Backend APIs Connected:
- **Projects**: `/api/projects/getProjectsByUser`, `/api/projects/getProject`, `/api/projects/create`
- **Tasks**: `/api/tasks/allTasks`, `/api/tasks/getTaskById`, `/api/tasks/create`, `/api/tasks/update`, `/api/tasks/delete`
- **Users**: `/api/users/allUsers`, `/api/users/searchUsers`, `/api/users/searchTeamMembers`
- **Skills**: `/api/skills/add`

### Frontend Components Updated:
- ✅ **Dashboard**: Now fetches real projects and tasks from backend
- ✅ **ProjectsView**: Displays real projects from backend
- ✅ **TasksView**: Shows real tasks from backend
- ✅ **TeamView**: Displays real team members from backend
- ✅ **API Service**: Centralized API communication layer
- ✅ **Auth Context**: User authentication and state management

## 🚀 How to Run the Integration

### 1. Start the Backend
```bash
cd backend/project-management-main
npm install
npm start
```
**Expected output**: `server is running on port 5000 and env is production`

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
**Expected output**: Frontend running on `http://localhost:3000`

### 3. Test the Integration
- Open `http://localhost:3000` in your browser
- Navigate through different views (Dashboard, Projects, Tasks, Team)
- All data should now come from your backend instead of hardcoded values

## 🔧 Configuration

### Backend Configuration
Make sure your `.env` file in `backend/project-management-main` contains:
```
MONGODB_URI=mongodb://localhost:27017/your-database-name
PORT=5000
NODE_ENV=development
```

### Frontend Configuration
The frontend will automatically connect to `http://localhost:5000`. If you need to change this, create a `.env.local` file in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check your MongoDB URI in the backend `.env` file

2. **CORS Errors**
   - Backend already has CORS enabled
   - If you see CORS errors, check that the frontend is making requests to the correct backend URL

3. **No Data Showing**
   - Check browser console for API errors
   - Verify backend is running on port 5000
   - Check that you have data in your MongoDB database

4. **API 404 Errors**
   - Ensure all backend routes are properly set up
   - Check that the API endpoints match between frontend and backend

## 📊 What's Working Now

- **Real-time Data**: All components fetch live data from your backend
- **Error Handling**: Proper loading states and error messages
- **User Context**: Mock admin user for testing (replace with real authentication later)
- **Responsive Design**: All components maintain their UI while using real data

## 🔄 Next Steps

1. **Add Real Authentication**: Replace mock user with actual login system
2. **Create/Update Operations**: Add forms for creating projects and tasks
3. **Real-time Updates**: Add WebSocket or polling for live updates
4. **File Upload**: Integrate file upload functionality for tasks
5. **Advanced Filtering**: Add more sophisticated search and filter options

## 🎯 Test the Integration

1. **Dashboard**: Should show real project counts and recent tasks
2. **Projects**: Should display actual projects from your database
3. **Tasks**: Should show real tasks with proper filtering
4. **Team**: Should display actual team members from your database

All components now have loading states and error handling, so you'll see appropriate messages if there are any connection issues. 
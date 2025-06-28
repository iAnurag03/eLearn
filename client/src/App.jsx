
import React from 'react'
import Navbar from './components/Navbar'
import Login from './Pages/Login.jsx'
import HeroSection from './Pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './Pages/student/Courses'
import MyLearning from './Pages/student/MyLearning.jsx'
import Profile from './Pages/student/Profile'
import Sidebar from './Pages/admin/Sidebar'
import Dashboard from './Pages/admin/Dashboard'
import CourseTable from './Pages/admin/CourseTable'
import AddCourse from './Pages/admin/AddCourse'
import EditCourse from './Pages/admin/EditCourse'
import CreateLecture from './Pages/admin/CreateLecture'
import EditLecture from './Pages/admin/EditLecture'
import CourseDetails from './Pages/student/CourseDetails'
import CourseProgress from './Pages/student/CourseProgress'
import SearchPage from './Pages/student/SearchPage'

import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes'
import ProtectPurchase from './components/ProtectPurchase'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login/>
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <ProtectPurchase>
              <CourseProgress />
            </ProtectPurchase>
            
            
          </ProtectedRoute>
        ),
      },

      // admin routes start from here
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar/>
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>

      <RouterProvider router={appRouter} />
      
    </main>
  );
}

export default App;
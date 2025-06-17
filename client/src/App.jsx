
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


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:(
          <><HeroSection/><Courses/></>
        ),
      },
      {
        path:"login",
        element:<Login/> 
      },
      {
        path:"my-learning",
        element:<MyLearning/> 
      },
      {
        path:"profile",
        element:<Profile/> 
      }
    ]
  }
])
const App = () => {
  return (
    <main>
     <RouterProvider router = {appRouter}/>
    </main>
  )
}

export default App

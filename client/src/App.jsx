import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Button } from "./components/ui/button"
import Login from "./Pages/login"
import MainLayout from "./Layout/MainLayout"
import HeroSection from "./Pages/student/HeroSection"
import MyLearning from "./Pages/student/MyLearning"
import Profile from "./Pages/student/Profile"


const approuter = createBrowserRouter([
  {
    path:"/",
    element: <MainLayout/>,
    children:[
      {
        path : "/",
        element:(
          <>
          <HeroSection/>
          </>
        ),
         
      },
      {
        path: "login",
        element:<Login/>

      },
      {
        path: "login",
        element:<MyLearning/>

      },
      {
        path: "profile",
        element:<Profile/>

      }

    ]
  }
])
function App() {
  return (
    <main>
      <RouterProvider router ={approuter}>

      </RouterProvider>
    </main>
  )
}

export default App 
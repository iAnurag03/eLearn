import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { appStore } from './app/store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { useLoadUserQuery } from './features/api/authApi.js'
import LoadingSpinner from './components/LoadingSpinner.jsx'


const Custom = ({children})=>{
  const {isLoading} = useLoadUserQuery();
  return (
    <>
    {isLoading? <LoadingSpinner/> :<>{children}</>}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={appStore}>
        <Custom>
          <App /> 
        </Custom>
         
         <Toaster/>
    </Provider>
    
  </React.StrictMode>,
) 
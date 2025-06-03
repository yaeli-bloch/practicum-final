import { RouterProvider } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import { Myrouter } from './MyRouter';
function App() {  
  return (
    <>    
    <AuthProvider>
      <RouterProvider router={Myrouter} />
      {/* <HomePage/>    */}
    </AuthProvider>      
    </>
  )
}
export default App

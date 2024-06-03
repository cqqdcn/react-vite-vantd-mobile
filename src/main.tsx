import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'
import "reset-css"
import "./index.scss"
import { AliveScope } from 'react-activation'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/index.ts'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AliveScope>
    <Provider store={store}>
      <RouterProvider router={router}><App /></RouterProvider>
    </Provider>
  </AliveScope>
)

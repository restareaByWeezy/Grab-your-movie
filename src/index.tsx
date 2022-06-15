import { RootRouter } from './routes/RootRouter'
import { RecoilRoot } from 'recoil'

import './styles'

import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <RecoilRoot>
    <RootRouter />
  </RecoilRoot>
)

import RootRouter from './routes/RootRouter'
import { RecoilRoot } from 'recoil'

// eslint-disable-next-line import/extensions
import './styles/index.js'

import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <RecoilRoot>
    <RootRouter />
  </RecoilRoot>
)

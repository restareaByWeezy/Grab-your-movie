/* eslint-disable import/extensions */
// @ts-nocheck

import { createRoot } from 'react-dom/client'
import RootRouter from './src/routes/RootRouter'
import { RecoilRoot } from 'recoil'
import './styles/index.js'

import React from 'react'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <RecoilRoot>
    <RootRouter />
  </RecoilRoot>
)

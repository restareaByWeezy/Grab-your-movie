/* eslint-disable react/function-component-definition */
// @ts-nocheck

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../common/Layout'
import Favorite from '../favorite/Favorite'
import Home from '../home/Home'

export default function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='favorite' element={<Favorite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

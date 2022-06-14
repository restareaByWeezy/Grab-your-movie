import reactDom from 'react-dom'

interface PortalProp {
  children: React.ReactNode
}
const ModalPortal = ({ children }: PortalProp) => {
  const el = document.getElementById('modal')
  return el && reactDom.createPortal(children, el)
}

export default ModalPortal

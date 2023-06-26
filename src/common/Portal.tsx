import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const modal = document.getElementById('portal') as HTMLElement;
  return ReactDOM.createPortal(children, modal);
}

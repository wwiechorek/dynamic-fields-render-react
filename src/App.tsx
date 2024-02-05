import { useRef, useState } from 'react'
import './App.css'
import DynamicRenderFields from './DynamicRenderFields';

function App() {
  const [values, setValues] = useState({})
  const container = useRef(null);
  function change(e: any) {
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  }

  return (
    <div ref={container} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <DynamicRenderFields
        data={fieldsData}
        values={values}
        onChange={change}
        container={container.current}
      />
    </div>
  )
}


const fieldsData: any[] = [
  {
    id: 1,
    name: 'Nome',
    type: 'text',
    relations: [],
  },
  {
    id: 3,
    name: 'Tipo pagamento',
    type: 'select',
    relations: [],
  },
  {
    id: 4,
    name: 'Pix',
    type: 'option',
    relations: [3],
  },
  {
    id: 5,
    name: 'Boleto',
    type: 'option',
    relations: [3],
  },
  {
    id: 6,
    name: 'Chave',
    type: 'text',
    relations: [4],
  },
];

export default App

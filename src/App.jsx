import { useState } from 'react';
import './App.css';
import { BiTrash } from 'react-icons/bi';

const Trace = ({ logs }) => (
  <div className="flex flex-col gap-4 justify-center items-center">
    <h2 className="text-neutral-200 text-3xl font-bold text-center">
      Prueba de escritorio <br /> (Tiempo real)
    </h2>
    <div className="bg-sky-800 p-4 rounded-lg text-neutral-400 h-72 overflow-y-scroll w-full max-w-md a backdrop-blur-sm bg-opacity-5">
      {logs.map((log, index) => (
        <div key={index} className="trace-log">
          {"> " + log}
        </div>
      ))}
    </div>
  </div>
);

function App() {
  const [rows, setRows] = useState([{ nota: '', porcentaje: '' }]);
  const [total, setTotal] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
    calculateTotal(newRows);
    addLog(`Valor cambiado en la fila ${index + 1}, en ${field}: ${value}`);
  };

  const addRow = () => {
    setRows([...rows, { nota: '', porcentaje: '' }]);
    addLog('Fila añadida');
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, x) => x !== index);
    if (rows.length !== 1) {
      setRows(newRows);
      calculateTotal(newRows);
      addLog(`Fila eliminada`);
    }
  };

  const trash = rows.length !== 1
    ? 'bg-red-500 text-white'
    : 'bg-red-800 cursor-default text-neutral-400';

  const calculateTotal = (rows) => {
    const total = rows.reduce((acc, row) => {
      const nota = parseFloat(row.nota) || 0;
      const porcentaje = parseFloat(row.porcentaje) || 0;
      return acc + nota * (porcentaje / 100);
    }, 0);
    setTotal(total.toFixed(2));
    addLog(`Nota total: ${total.toFixed(2)}`);
  };

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  return (
    <div className='flex flex-col gap-20 pb-28'>
      <div className="w-full flex flex-col lg:flex-row pt-32 items-center gap-8 lg:gap-28 justify-center">
        <div className='flex items-center flex-col gap-4'>
          <h1 className="text-neutral-200 mx-auto text-4xl lg:text-5xl font-bold">Calcular notas</h1>
          <div className="rounded-lg flex flex-col gap-8 w-full max-w-md">
            <table className="rounded-lg w-full">
              <thead className="gap-4">
                <tr className="text-white gap-2 bg-blue-500">
                  <th className="px-4 py-1 rounded-l-lg">#</th>
                  <th className="px-4 py-1">Nota</th>
                  <th className="px-4 py-1">Porcentaje</th>
                  <th className="px-4 py-1 rounded-r-lg"></th>
                </tr>
              </thead>
              <tbody className=' backdrop-blur-md bg-opacity-5'>
                {rows.map((row, index) => (
                  <tr className="text-neutral-200 gap-2" key={index}>
                    <td className="px-4 py-1">{index + 1}</td>
                    <td className="px-4 py-1">
                      <input
                        type="text"
                        placeholder="Nota"
                        className="w-full bg-transparent placeholder:text-neutral-500 placeholder:text-center text-center"
                        value={row.nota}
                        onChange={(e) => handleInputChange(index, 'nota', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-1">
                      <input
                        type="text"
                        placeholder="Porcentaje"
                        className="w-full bg-transparent placeholder:text-neutral-500 placeholder:text-center text-center"
                        value={row.porcentaje}
                        onChange={(e) => handleInputChange(index, 'porcentaje', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-1">
                      <button
                        className={`px-2 py-0.5 my-1 ${trash} rounded`}
                        onClick={() => removeRow(index)}
                      >
                        <BiTrash className='h-6 w-6 max-lg:h-5 max-lg:w-5' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-between items-center'>
              <button className="px-4 py-1 bg-blue-500 text-white rounded font-semibold" onClick={addRow}>
                Fila +
              </button>
              <div id="total" className="text-neutral-200 text-2xl font-bold">
                Total: {total}
              </div>
            </div>
          </div>
        </div>
        <Trace logs={logs} />
      </div>
      <div className='flex justify-center flex-col w-full gap-5 mx-auto max-w-screen-lg'>
        <h2 className="text-neutral-200 text-3xl font-bold text-center">Prueba de escritorio <br /> (Tabla)</h2>
        <div className=' overflow-auto a '>
          <table className="rounded-lg w-full">
            <thead className="gap-4">
              <tr className="text-white gap-2 bg-blue-500">
                <th className="px-4 py-1 rounded-l-lg">#</th>
                <th className="px-4 py-1">Instrucciones</th>
                <th className="px-4 py-1">Nota</th>
                <th className="px-4 py-1">Porcentaje</th>
                <th className="px-4 py-1">Total</th>
                <th className="px-4 py-1 rounded-r-lg">Pantalla</th>
              </tr>
            </thead>
            <tbody className=' backdrop-blur-md bg-opacity-5'>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">1</td>
                <td className="px-4 py-1"></td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
              </tr>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">2</td>
                <td className="px-4 py-1">Leer nota</td>
                <td className="px-4 py-1">3.5</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
              </tr>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">3</td>
                <td className="px-4 py-1">Leer porcentaje</td>
                <td className="px-4 py-1">3.5</td>
                <td className="px-4 py-1">60</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
              </tr>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">4</td>
                <td className="px-4 py-1">Calcular total</td>
                <td className="px-4 py-1">3.5</td>
                <td className="px-4 py-1">60</td>
                <td className="px-4 py-1">nota + 3.5 * (60/100)</td>
                <td className="px-4 py-1">Indefinido</td>
              </tr>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">5</td>
                <td className="px-4 py-1">Imprimir total</td>
                <td className="px-4 py-1">3.5</td>
                <td className="px-4 py-1">60</td>
                <td className="px-4 py-1">2.10</td>
                <td className="px-4 py-1">2.10</td>
              </tr>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">6</td>
                <td className="px-4 py-1">Crear nueva fila</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
              </tr>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">7</td>
                <td className="px-4 py-1">Leer nota</td>
                <td className="px-4 py-1">4.3</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
              </tr>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">8</td>
                <td className="px-4 py-1">Leer porcentaje</td>
                <td className="px-4 py-1">4.3</td>
                <td className="px-4 py-1">40</td>
                <td className="px-4 py-1">Indefinido</td>
                <td className="px-4 py-1">Indefinido</td>
              </tr>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">9</td>
                <td className="px-4 py-1">Calcular total</td>
                <td className="px-4 py-1">4.3</td>
                <td className="px-4 py-1">40</td>
                <td className="px-4 py-1">nota + 4.3 * (40/100)</td>
                <td className="px-4 py-1">3.82</td>
              </tr>
              <tr className="text-neutral-400 gap-2">
                <td className="px-4 py-1">10</td>
                <td className="px-4 py-1">Imprimir total</td>
                <td className="px-4 py-1">4.3</td>
                <td className="px-4 py-1">40</td>
                <td className="px-4 py-1">3.82</td>
                <td className="px-4 py-1">3.82</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

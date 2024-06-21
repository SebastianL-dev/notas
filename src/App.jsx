import { useState } from 'react'
import './App.css'

const Trace = ({ logs }) => (
  <div className="flex gap-4 flex-col justify-center items-center">
    <h2 className="text-neutral-200 text-3xl font-bold text-center">Prueba de escritorio <br /> (Tiempo real)</h2>
    <div className="bg-neutral-800 p-4 rounded-lg text-neutral-400 h-72 overflow-y-scroll w-[420px] a">
      {logs.map((log, index) => (
        <div key={index} className="trace-log">
          {index + 1}. {log}
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
    addLog(`Valor cambiado en la fila ${index + 1}, en  ${field}: ${value}`);
  };

  const addRow = () => {
    setRows([...rows, { nota: '', porcentaje: '' }]);
    addLog('Fila añadida');
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, x) => x !== index);
    setRows(newRows);
    calculateTotal(newRows);
    addLog(`Fila eliminada`);
  };

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
    <div className='flex flex-col gap-20 mb-28'>
      <div className="w-full flex-row flex pt-32 items-center gap-28 justify-center max-lg:flex-col">
        <div className='flex items-center flex-col gap-4'>
          <h1 className="text-neutral-200 mx-auto text-5xl font-bold">Calcular notas</h1>
          <div className="rounded-lg p-4 border-neutral-400 flex flex-col gap-8">
            <table className="rounded-lg">
              <thead className="gap-4">
                <tr className="text-white gap-2 bg-blue-500">
                  <th className="px-4 py-1 rounded-l-lg">#</th>
                  <th className="px-4 py-1">Nota</th>
                  <th className="px-4 py-1">Porcentaje</th>
                  <th className="px-4 py-1 rounded-r-lg">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr className="text-neutral-200 gap-2" key={index}>
                    <td className="px-4 py-1">{index + 1}</td>
                    <td className="px-4 py-1">
                      <input
                        type="text"
                        placeholder="Nota"
                        className="w-20 bg-transparent placeholder:text-neutral-500 placeholder:text-center text-center"
                        value={row.nota}
                        onChange={(e) => handleInputChange(index, 'nota', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-1">
                      <input
                        type="text"
                        placeholder="Porcentaje"
                        className="w-28 bg-transparent placeholder:text-neutral-500 placeholder:text-center text-center"
                        value={row.porcentaje}
                        onChange={(e) => handleInputChange(index, 'porcentaje', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-1">
                      <button
                        className="px-2 py-0.5 my-1 bg-red-500 text-white rounded"
                        onClick={() => removeRow(index)}
                      >
                        Eliminar
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
      <div className='flex justify-center flex-col w-max gap-5 mx-auto'>
        <h2 className="text-neutral-200 text-3xl font-bold text-center">Prueba de escritorio <br /> (Tabla)</h2>
        <table className="rounded-lg">
          <thead className="gap-4">
            <tr className="text-white gap-2 bg-blue-500">
              <th className="px-4 py-1 rounded-l-lg">#</th>
              <th className="px-4 py-1">Instrucciones</th>
              <th className="px-4 py-1">Nota</th>
              <th className="px-4 py-1">Porcentaje</th>
              <th className="px-4 py-1 rounded-r-lg">Pantalla</th>
              {/* <th className="px-4 py-1 rounded-r-lg">Acciones</th> */}
            </tr>
          </thead>
          <tbody>

            <tr className="text-neutral-200 gap-2" >
              <td className="px-4 py-1">1</td>
              <td className="px-4 py-1"></td>
              <td className="px-4 py-1">Indefinido</td>
              <td className="px-4 py-1">Indefinido</td>
              <td className="px-4 py-1">Indefinido</td>
            </tr>
            <tr className="text-neutral-200 gap-2" >
              <td className="px-4 py-1">2</td>
              <td className="px-4 py-1">Leer nota</td>
              <td className="px-4 py-1">3.5</td>
              <td className="px-4 py-1">Indefinido</td>
              <td className="px-4 py-1">Indefinido</td>
            </tr>
            <tr className="text-neutral-200 gap-2" >
              <td className="px-4 py-1">3</td>
              <td className="px-4 py-1">Leer porcentaje</td>
              <td className="px-4 py-1">3.5</td>
              <td className="px-4 py-1">60</td>
              <td className="px-4 py-1">Indefinido</td>
            </tr>
            <tr className="text-neutral-200 gap-2" >
              <td className="px-4 py-1">4</td>
              <td className="px-4 py-1">Imprimir total</td>
              <td className="px-4 py-1">3.5</td>
              <td className="px-4 py-1">60</td>
              <td className="px-4 py-1">2.10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App

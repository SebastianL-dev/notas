import { useState } from 'react'
import './App.css'

function App() {
  const [rows, setRows] = useState([{ nota: '', porcentaje: '' }]);
  const [total, setTotal] = useState(0);

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
    calculateTotal(newRows);
  };

  const addRow = () => {
    setRows([...rows, { nota: '', porcentaje: '' }]);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    calculateTotal(newRows);
  };

  const calculateTotal = (rows) => {
    const total = rows.reduce((acc, row) => {
      const nota = parseFloat(row.nota) || 0;
      const porcentaje = parseFloat(row.porcentaje) || 0;
      return acc + nota * (porcentaje / 100);
    }, 0);
    setTotal(total.toFixed(2));
  };

  return (
    // <div className="w-full flex pt-32 flex-col items-center gap-16">
    //   <h1 className="text-neutral-200 mx-auto text-5xl font-bold">Calcular notas</h1>
    //   <div className="rounded-lg p-4 border-neutral-400 gap-8 flex flex-col">
    //     <table className="rounded-lg">
    //       <thead className="gap-4">
    //         <tr className="text-white gap-2 bg-blue-500">
    //           <th className="px-4 py-1 rounded-l-lg">Rank</th>
    //           <th className="px-4 py-1">Nota</th>
    //           <th className="px-4 py-1 rounded-r-lg">Porcentaje</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {rows.map((row, index) => (
    //           <tr className="text-neutral-200 gap-2" key={index}>
    //             <td className="px-4 py-1">{index + 1}</td>
    //             <td className="px-4 py-1">
    //               <input
    //                 type="text"
    //                 placeholder="Nota"
    //                 className="w-20 bg-transparent placeholder:text-neutral-500 placeholder:text-center text-center"
    //                 value={row.nota}
    //                 onChange={(e) => handleInputChange(index, 'nota', e.target.value)}
    //               />
    //             </td>
    //             <td className="px-4 py-1">
    //               <input
    //                 type="text"
    //                 placeholder="Porcentaje"
    //                 className="w-28 bg-transparent placeholder:text-neutral-500 placeholder:text-center text-center"
    //                 value={row.porcentaje}
    //                 onChange={(e) => handleInputChange(index, 'porcentaje', e.target.value)}
    //               />
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //     <div className='flex justify-between items-center'>
    //       <button className="px-4 py-1 bg-blue-500 text-white rounded font-semibold" onClick={addRow}>
    //         Fila +
    //       </button>
    //       <div id="total" className="text-neutral-200 text-2xl font-bold">
    //         Total: {total}
    //       </div>
    //       <button className="px-4 py-1 bg-blue-500 text-white rounded font-semibold" onClick={() => removeRow(index)}>
    //         Fila -
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full flex pt-32 flex-col items-center gap-16">
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
  );
}

export default App

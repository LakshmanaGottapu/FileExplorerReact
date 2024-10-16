import { useState } from 'react'
import Folder from './Components/Folder'
import { data as oil } from './data'
export interface DataInterface{
  id: number,
  name: string,
  isFolder: boolean,
  items?: DataInterface[]
}
function App() {
  const [data, setData] = useState<DataInterface>(oil)

  return (
    <div>
      <Folder explorer={data} setData={setData} data={data} key={data.id}/>
    </div>
  )
}

export default App

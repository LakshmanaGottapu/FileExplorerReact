import { DataInterface } from '../App';
import {Dispatch, SetStateAction, useState} from 'react'
function Folder({explorer, setData, data}:{explorer:DataInterface, setData:Dispatch<SetStateAction<DataInterface>>, data:DataInterface}) {
    const {id, name, isFolder, items} = explorer;
    const [expand, setExpand] = useState<boolean>(false)
    const [showInput, setShowInput] = useState<boolean>(false);
    const [addFile, setAddFile] = useState<boolean>(false);
    function handleExpand(e){
        e.stopPropagation();
        setExpand(prev => !prev);
    }
    function handleNewFolder(e){
        e.stopPropagation();
        if(!expand){
            setExpand(true);
            setShowInput(true);
        }
        else
            setShowInput(prev => !prev);
    }
    function addNewFolder(inputText:string, isFolder:boolean){
        let value;
        value = {
            id: Date.now(),
            name: inputText,
            isFolder,
        }
        if(value.isFolder)
            value = {...value, items:[]};
        setData(data => insertNode(value, data));
    }
    function insertNode(value:DataInterface, oil:DataInterface):DataInterface{
        if(oil.isFolder && id===oil.id){
            oil.items?.push(value);
            return oil;
        }
        const items = oil.items?.map(item => insertNode(value, item));
        return {...oil, items};
    }
    return (
        <div style={{cursor:'pointer', margin:isFolder?'0.75rem':'0.25rem', padding:'0.25rem', maxWidth:'40vw', borderRadius:'0.50rem'}}>
            <div style={{padding:'0.5rem', background:isFolder?'lightgray':'', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span onClick={handleExpand} style={{padding:'0.5rem', background:isFolder?'lightgray':''}}>
                    {isFolder?((expand?'📂':'📁')+name):'📄'+name}
                </span>
                {isFolder && 
                    <span style={{display:'flex'}}>
                        <button className="folder" onClick={(e)=>{
                            setAddFile(false);
                            handleNewFolder(e);
                        }
                    }>Add Folder +</button>
                        <button className="file" onClick={(e)=>{
                            setAddFile(true);
                            handleNewFolder(e);
                        }
                    }>Add File +</button>
                    </span>
                }
            </div>
            {/* style={{display:expand?'block':'none'}} */}
            {/* style={{border:'1px solid green'}} */}
            {isFolder && <div > 
                {showInput && <input className="folder" autoFocus style={{marginTop:'5px'}}
                    onBlur = {(e)=>{
                        // if(e.target == )
                        setShowInput(false)
                    }}
                    onKeyDown={(e)=>{
                        const targetElement =  (e.target as HTMLInputElement)
                        const inputText = targetElement.value
                        if(e.code==='Enter' && inputText){
                            targetElement.value=''
                            setShowInput(false);
                            addNewFolder(inputText, !addFile)
                        }
                    }}
                />}
                {expand && items?.map(item => <Folder explorer={item} setData={setData} data={data} key={item.id}/>)}
            </div>}
        </div>
    )
}

export default Folder;

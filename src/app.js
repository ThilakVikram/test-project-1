import { useRef, useState } from "react"

export default function App() {
    let data = {
        "Applicant 1":{"profile.jpg":"1"}
    }
    let activeApplication = "Applicant 1";
    return <div className="w-full h-full max-h-full flex flex-col overflow-scroll">
        <div className="bg-violet-600 p-3 flex flex-row">
            <div className="flex-1"><span className="w-fit text-3xl italic font-bold">Applicant Documents</span></div>
            <div className="flex-1 max-w-fit min-h-full items-center flex justify-center"><button className="w-fit h-full rounded-xl px-2 bg-white">Add Applicant</button></div>
        </div>
        <div className="flex-1 max-h-full bg-gray-300 flex flex-col overflow-scroll">
            <ApplicantBoard applicants={Object.keys(data)} />
            <ApplicantDocumentView>
                <DocumentBoard />
                <DocumentUploadandView onFileNameCapture={(e)=>{

                }} />
            </ApplicantDocumentView>
        </div>
    </div>
}

function ApplicantBoard({ applicants = [] }) {
    return <div className="w-full h-fit flex flex-row overflow-scroll hideScrollBar">
        {applicants.map(applicant=><div className="bg-gray-600 text-white w-fit p-1 px-2 rounded-t-xl">{applicant}</div>)}
    </div>
}

function ApplicantDocumentView({ children }) {
    return <div className="w-full max-h-full flex-1 bg-gray-600 p-3 flex flex-row overflow-scroll">
        {children}
    </div>
}

function DocumentBoard() {
    return <div className="w-fit h-full overflow-scroll flex flex-col rounded-xl rounded-r-none ml-3 relative bg-white">
        <div className="w-full flex items-center justify-center bg-white sticky top-0 text-xl font-bold p-3 shadow-xl z-10">Documents Add</div>
        <div className="h-fit w-fit p-2 pr-4"><span className="max-w-55 flex p-3 bg-violet-600 rounded-xl hover:translate-x-4 font-bold max-w-56 w-56 hover:rounded-r-none">Document1</span></div>
        <div className="h-fit w-fit p-2 pr-4"><span className="max-w-55 flex p-3 bg-violet-300 rounded-xl hover:translate-x-4 font-bold max-w-56 w-56 hover:rounded-r-none">Document1</span></div>
        <div className="h-fit w-fit p-2 pr-4"><span className="max-w-55 flex p-3 bg-violet-300 rounded-xl hover:translate-x-4 font-bold max-w-56 w-56 hover:rounded-r-none">Document1</span></div>
        <div className="h-fit w-fit p-2 pr-4"><span className="max-w-55 flex p-3 bg-violet-300 rounded-xl hover:translate-x-4 font-bold max-w-56 w-56 hover:rounded-r-none">Document1</span></div>
        <div className="h-fit w-fit p-2 pr-4"><span className="max-w-55 flex p-3 bg-violet-300 rounded-xl hover:translate-x-4 font-bold max-w-56 w-56 hover:rounded-r-none">Document1</span></div>
    </div>
}

function DocumentUploadandView({onFileNameCapture}) {
    let inputRef;
    let [file, setfile] = useState(null);
    let [isFileUploaded,setisFileUploaded] = useState(false);
    let [isPreviewAvailable,setisPreviewAvailable] = useState(false);

    return <div className="flex-1 bg-violet-600 rounded-xl rounded-l-none flex flex-col p-1 relative">
        <div className="flex-1 flex items-center justify-center" onDoubleClick={(e) => {
            inputRef.click();
        }} {...DragDrop((e) => {
            setfile(e);
        })}>
            <BlurImage/>
            {/* {file?(isPreviewAvailable?"Preview":`Upload file to Cloud to get Preview`):"Double Click to upload file or Drag and Drop the file"} */}
            <input className="hidden" ref={(e) => {
                inputRef = e;
            }} type="file"></input>
        </div>
        <div className={`p-1 px-2 w-fit absolute bottom-0 right-0 m-2 rounded-xl${(isFileUploaded?"bg-green-300":" bg-gray-300")}`}>{isFileUploaded?"File Uploaded":"Upload to Cloud"}</div>
        <div className="p-1 px-2 bg-gray-300 w-fit absolute top-0 right-0 m-2 rounded-xl">Double Click to upload file or Drag and Drop the file</div>
    </div>
}

function DragDrop(fileEvent) {
    return {
        onDragStart: (e) => {
            e.preventDefault()
        },
        onDragEnter: (e) => {
            e.preventDefault()
        },
        onDragOver: (e) => {
            e.preventDefault();
        },
        onDrop: (e) => {
            e.preventDefault();
            let [file] = e.dataTransfer.files;
            fileEvent(file);
        }
    }
}

function BlurImage(){
    return <div className="flex-1 relative">
        <img className="max-h-full h-full blur-md" src="./logo192.png"></img>
    </div>
}
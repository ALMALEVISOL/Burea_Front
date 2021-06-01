import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRef, useState, useEffect } from "react"

const Editor = props => {
  const { document, setSelectedDocument, setModifiedNumberLine, setDocuments, documents, getHeaderType } = props
  const [ rawContent, setRawContent ]= useState( null )
  const handleTextAreaChange = e => {
    const lines = e.target.value.split('\n')
    if ( lines && lines.length === 1 && lines[0] === "" ) {
      setSelectedDocument({ ...document, workingHtml: "", raw_content: e.target.value })
      setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )
      setRawContent( e.target.value )
      return
    }
    const htmlLines = document?.workingHtml !== null ? document?.workingHtml?.split("\n") : []
    const numberLine = e.target.value.substr(0, e.target.selectionStart).split("\n").length
    const lineContentG = lines[ numberLine - 1 ]
    let newHtml = null;
    if ( e && e.nativeEvent?.inputType === "insertFromPaste" ){
      for ( let x = 0; x < lines.length; x++ ){
        const lineContent = lines[ x ]
        if ( lineContent && lineContent.startsWith("#")){
          const headerType = getHeaderType( lineContent )
          if ( headerType ){
            htmlLines[ x ] = headerType.open + lineContent.substr( headerType.position,  lineContent.length - 1) + headerType.close
            newHtml = htmlLines.join("\n")
            let documentsCopy = [ ...documents ]
            let currentIndex = documentsCopy.findIndex( doc => doc.id === document.id )
            documentsCopy[currentIndex].workingHtml = newHtml
            documentsCopy[currentIndex].raw_content = e.target.value
            setDocuments( documentsCopy )
            setSelectedDocument({ ...document, workingHtml: newHtml, raw_content: e.target.value })
            setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )
            setRawContent( e.target.value )
            continue
          }
          if ( !headerType ){
            htmlLines[ x ] = "<p>" + lineContent + "</p>"
            newHtml = htmlLines.join("\n")
            let documentsCopy = [ ...documents ]
            let currentIndex = documentsCopy.findIndex( doc => doc.id === document.id )
            documentsCopy[currentIndex].workingHtml = newHtml
            documentsCopy[currentIndex].raw_content = e.target.value
            setDocuments( documentsCopy )
            setSelectedDocument({ ...document, workingHtml: newHtml, raw_content: e.target.value })
            setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )
            setRawContent( e.target.value )
            continue
          }
        }
        if ( lineContent.indexOf("`") > -1 &&  lineContent.lastIndexOf("`") > -1 && lineContent.indexOf("`") !== lineContent.lastIndexOf("`") ){
          const preText = lineContent.substr( 0 ,  lineContent.indexOf("`") )
          const textCode = lineContent.substr( lineContent.indexOf("`") + 1,  lineContent.lastIndexOf("`") - (preText.length + 1) )
          const posText = lineContent.substr( lineContent.lastIndexOf("`") + 1 ,  lineContent.length )
          htmlLines[ x ] = preText + "<code>" + textCode + "</code>" + posText
          newHtml = htmlLines.join("\n")
          let documentsCopy = [ ...documents ]
          let currentIndex = documentsCopy.findIndex( doc => doc.id === document.id )
          documentsCopy[currentIndex].workingHtml = newHtml
          documentsCopy[currentIndex].raw_content = e.target.value
          setDocuments( documentsCopy )
          setSelectedDocument({ ...document, workingHtml: newHtml, raw_content: e.target.value })
          setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )
          setRawContent( e.target.value )
          continue
        }
        htmlLines[ x ] = "<p>" + lineContent + "</p>"
        newHtml = htmlLines.join("\n")
        let documentsCopy = [ ...documents ]
        let currentIndex = documentsCopy.findIndex( doc => doc.id === document.id )
        documentsCopy[currentIndex].workingHtml = newHtml
        documentsCopy[currentIndex].raw_content = e.target.value
        setDocuments( documentsCopy )
        setSelectedDocument({ ...document, workingHtml: newHtml, raw_content: e.target.value })
        setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )
      }
      return
    }
    if ( lineContentG && lineContentG.startsWith("#")){
      const headerType = getHeaderType( lineContentG )
      if ( headerType ){
        htmlLines[ numberLine - 1 ] = headerType.open + lineContentG.substr( headerType.position,  lineContentG.length - 1) + headerType.close
        newHtml = htmlLines.join("\n")
        let documentsCopy = [ ...documents ]
        let currentIndex = documentsCopy.findIndex( doc => doc.id === document.id )
        documentsCopy[currentIndex].workingHtml = newHtml
        documentsCopy[currentIndex].raw_content = e.target.value
        setDocuments( documentsCopy )
        setSelectedDocument({ ...document, workingHtml: newHtml, raw_content: e.target.value })
        setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )
        setRawContent( e.target.value )
        return
      }
      if ( !headerType ){
        htmlLines[ numberLine - 1 ] = "<p>" + lineContentG + "</p>"
        newHtml = htmlLines.join("\n")
        let documentsCopy = [ ...documents ]
        let currentIndex = documentsCopy.findIndex( doc => doc.id === document.id )
        documentsCopy[currentIndex].workingHtml = newHtml
        documentsCopy[currentIndex].raw_content = e.target.value
        setDocuments( documentsCopy )
        setSelectedDocument({ ...document, workingHtml: newHtml, raw_content: e.target.value })
        setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )
        setRawContent( e.target.value )
        return
      }
    }
    if ( lineContentG.indexOf("`") > -1 &&  lineContentG.lastIndexOf("`") > -1 && lineContentG.indexOf("`") !== lineContentG.lastIndexOf("`") ){
      if ( lineContentG.length === 2 ){
        htmlLines[ numberLine - 1 ] = "<p>" + lineContentG + "</p>"
        newHtml = htmlLines.join("\n")
        let documentsCopy = [ ...documents ]
        let currentIndex = documentsCopy.findIndex( doc => doc.id === document.id )
        documentsCopy[currentIndex].workingHtml = newHtml
        documentsCopy[currentIndex].raw_content = e.target.value
        setDocuments( documentsCopy )
        setSelectedDocument({ ...document, workingHtml: newHtml, raw_content: e.target.value })
        setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )
        return
      }
      const preText = lineContentG.substr( 0 ,  lineContentG.indexOf("`") )
      const textCode = lineContentG.substr( lineContentG.indexOf("`") + 1,  lineContentG.lastIndexOf("`") - (preText.length + 1) )
      const posText = lineContentG.substr( lineContentG.lastIndexOf("`") + 1 ,  lineContentG.length )
      htmlLines[ numberLine - 1 ] = preText + "<code>" + textCode + "</code>" + posText
      newHtml = htmlLines.join("\n")
      let documentsCopy = [ ...documents ]
      let currentIndex = documentsCopy.findIndex( doc => doc.id === document.id )
      documentsCopy[currentIndex].workingHtml = newHtml
      documentsCopy[currentIndex].raw_content = e.target.value
      setDocuments( documentsCopy )
      setSelectedDocument({ ...document, workingHtml: newHtml, raw_content: e.target.value })
      setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )
      setRawContent( e.target.value )
      return
    }
    htmlLines[ numberLine - 1 ] = "<p>" + lineContentG + "</p>"
    newHtml = htmlLines.join("\n")
    let documentsCopy = [ ...documents ]
    let currentIndex = documentsCopy.findIndex( doc => doc.id === document.id )
    documentsCopy[currentIndex].workingHtml = newHtml
    documentsCopy[currentIndex].raw_content = e.target.value
    setDocuments( documentsCopy )
    setSelectedDocument({ ...document, workingHtml: newHtml, raw_content: e.target.value })
    setModifiedNumberLine( e.target.value.substr(0, e.target.selectionStart).split("\n").length )    
  }
  return (
    <div style={{ width: "100%", height: "100%" }} >
      <textarea id="raw_editor" name="raw_editor" rows={4} cols={50} style={{ width: "100%", height: "100%", padding: "20px 20px 0 20px" }} onChange={ (e) => handleTextAreaChange( e )}  value={ document ? document.raw_content : "" }    />
    </div> 
  )
}

const RenderHTML = props => {
  const { document } = props
  return (
    <div style={{ width: 500, height: "100%", border: "1px black solid", padding: "0 20px 0 20px"}}  dangerouslySetInnerHTML={{__html: document?.workingHtml}} /> 
  )
}

const Sidebar = props => {
  const { style, documents, className, handleDocumentClick, setDocuments, selectedDocument, updateDocument, deleteDocument, fetch, setSelectedDocument } = props
  const addNewDocument = () => {
    const today = new Date()
    const doc = {
      id: Math.random().toString(36).substring(6), 
      name: "Doc_" + Math.random().toString(36).substring(6), 
      last_modification_date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
      workingHtml: "",
      raw_content: ""
    }
    setDocuments( documents ? [ ...documents, doc ] : [ doc ] )
  }
  return (
    <div style={ style } className={ className } >
      <div style={{ fontWeight: 800, textAlign: "center", padding: "5px", backgroundColor: "#6aa6e5" }} >
        <button style={{ border: "0.5px", borderRadius: "30" }} onClick={() => addNewDocument() } > Create new document </button>
      </div>
      <div style={{ fontWeight: 800, textAlign: "center", padding: "5px", backgroundColor: "#6aa6e5" }} >
        MARKDOWN EDITOR
      </div>
      { documents && documents.map( doc => <Document key={doc.id} doc={doc}  style={{ display: "flex", padding: "0 20px 0 20px", marginBottom: "5px", cursor: "pointer", backgroundColor: doc.id === selectedDocument?.id ? "#d4adf1db" : "" }} className={"document"} handleDocumentClick={handleDocumentClick} updateDocument={updateDocument}  deleteDocument={deleteDocument} fetch={fetch} setSelectedDocument={setSelectedDocument} /> ) }
    </div> 
  )
}

const Document = props => {
  const { style, className, doc, handleDocumentClick, updateDocument, fetch, setSelectedDocument } = props
  return (
    <div style={ style } className={ className } onClick={ () => handleDocumentClick(doc) } >
      <svg style={{ height: 70, width: 50 }} id="Capa_1" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m446.605 124.392-119.997-119.997c-2.801-2.802-6.624-4.395-10.608-4.395h-210c-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h300c24.813 0 45-20.187 45-45v-332c0-4.09-1.717-7.931-4.395-10.608zm-115.605-73.179 68.787 68.787h-53.787c-8.271 0-15-6.729-15-15zm75 430.787h-300c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h195v75c0 24.813 20.187 45 45 45h75v317c0 8.271-6.729 15-15 15z"/><path d="m346 212h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/><path d="m346 272h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/><path d="m346 332h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/><path d="m286 392h-120c-8.284 0-15 6.716-15 15s6.716 15 15 15h120c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/></g></svg>
      <div style={{  display: "flex", flexDirection: "column"  }} >
        <p style={{ margin: "unset", marginTop: "12px", height: "32%" }}>
          {doc.name}
        </p>
        <p style={{ fontSize: "11px", margin: "unset" }} >
          {doc.last_modification_date}
        </p>
      </div>
      <div style={{ width: "50%", justifyContent: "right", alignItems: "center", display: "flex", flexFlow: "row-reverse" }} >
        <svg style={{ height: 20, width: 20, cursor: "pointer", float: "right" }} onClick={ () => deleteDocument(doc, fetch, setSelectedDocument) } height="427pt" viewBox="-40 0 427 427.00131" width="427pt" xmlns="http://www.w3.org/2000/svg"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/></svg>
        <svg style={{ height: 20, width: 20, cursor: "pointer", float: "right" }} onClick={ () => updateDocument( doc ) } id="Capa_1" enable-background="new 0 0 512.007 512.007" height="512" viewBox="0 0 512.007 512.007" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m511.927 126.537c-.279-2.828-1.38-5.666-3.315-8.027-.747-.913 6.893 6.786-114.006-114.113-2.882-2.882-6.794-4.395-10.612-4.394-9.096 0-329.933 0-338.995 0-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45 .001-364.186.041-339.316-.072-340.466zm-166.927-96.534v98c0 8.271-6.729 15-15 15h-19v-113zm-64 0v113h-139c-8.271 0-15-6.729-15-15v-98zm64 291h-218v-19c0-8.271 6.729-15 15-15h188c8.271 0 15 6.729 15 15zm-218 161v-131h218v131zm355-15c0 8.271-6.729 15-15 15h-92c0-19.555 0-157.708 0-180 0-24.813-20.187-45-45-45h-188c-24.813 0-45 20.187-45 45v180h-52c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h52v98c0 24.813 20.187 45 45 45h188c24.813 0 45-20.187 45-45v-98h2.787l104.213 104.214z"/></g></svg>
      </div>
    </div>
  )
}


const MainPage = props => {
  const { documents, setDocuments, fetch } = props
  const [ selectedDocument, setSelectedDocument ] = useState(null)
  const [ modifiedNumberLine, setModifiedNumberLine ]= useState( 0 )
  
  const getHeaderType = lineContent => {   
    for ( let i = 1; i < 7; i++ ){
      const numberSignCount = "#".repeat(i) + " "
      if (  lineContent.startsWith( numberSignCount ) ){
        return { open: "<h" + i + ">", close: "</h" + i + ">", position: i }
      }
    }
  }
  const toHtml = () => {
    if ( selectedDocument !== null ){
      const lines = selectedDocument.raw_content?.split('\n')
      const htmlLines = selectedDocument?.workingHtml !== null ? selectedDocument?.workingHtml?.split("\n") : []
      let newHtml = null;
      for ( let x = 0; x < lines.length; x++ ){
        const lineContent = lines[ x ]
        if ( lineContent && lineContent.startsWith("#")){
          const headerType = getHeaderType( lineContent )
          if ( headerType ){
            htmlLines[ x ] = headerType.open + lineContent.substr( headerType.position,  lineContent.length - 1) + headerType.close
            newHtml = htmlLines.join("\n")
            let documentsCopy = [ ...documents ]
            let currentIndex = documentsCopy.findIndex( doc => doc.id === selectedDocument.id )
            documentsCopy[currentIndex].workingHtml = newHtml
            setDocuments( documentsCopy )
            continue
          }
          if ( !headerType ){
            htmlLines[ x ] = "<p>" + lineContent + "</p>"
            newHtml = htmlLines.join("\n")
            let documentsCopy = [ ...documents ]
            let currentIndex = documentsCopy.findIndex( doc => doc.id === selectedDocument.id )
            documentsCopy[currentIndex].workingHtml = newHtml
            setDocuments( documentsCopy )
            continue
          }
        }
        if ( lineContent.indexOf("`") > -1 &&  lineContent.lastIndexOf("`") > -1 && lineContent.indexOf("`") !== lineContent.lastIndexOf("`") ){
          const preText = lineContent.substr( 0 ,  lineContent.indexOf("`") )
          const textCode = lineContent.substr( lineContent.indexOf("`") + 1,  lineContent.lastIndexOf("`") - (preText.length + 1) )
          const posText = lineContent.substr( lineContent.lastIndexOf("`") + 1 ,  lineContent.length )
          htmlLines[ x ] = preText + "<code>" + textCode + "</code>" + posText
          newHtml = htmlLines.join("\n")
          let documentsCopy = [ ...documents ]
          let currentIndex = documentsCopy.findIndex( doc => doc.id === selectedDocument.id )
          documentsCopy[currentIndex].workingHtml = newHtml
          setDocuments( documentsCopy )
          continue
        }
        htmlLines[ x ] = "<p>" + lineContent + "</p>"
        newHtml = htmlLines.join("\n")
        let documentsCopy = [ ...documents ]
        let currentIndex = documentsCopy.findIndex( doc => doc.id === selectedDocument.id )
        documentsCopy[currentIndex].workingHtml = newHtml
        setDocuments( documentsCopy )
      }
      return
    }
  }
  const handleDocumentClick = (doc) => {
    setSelectedDocument( doc )
  }
  const updateDocument = () => {
    patchDocument( selectedDocument )
  }
  useEffect(()=>{
    toHtml()
  }, [selectedDocument])
  return (
    <div>
      <div style={{ display: "flex" }} >
          <Sidebar  style={{ backgroundColor: "#bfd8ea", height: "73vh", width: 350, top: 0, left: 0, maxHeight: "100%", overflowY: "auto" }} fetch={fetch} className={"sidebar"} documents={ documents } handleDocumentClick={handleDocumentClick} setDocuments={setDocuments}    selectedDocument={selectedDocument} updateDocument={updateDocument} deleteDocument={deleteDocument} toHtml={toHtml} setSelectedDocument={setSelectedDocument} />
        <div style={{ width: "50%" }} >
          <Editor document={ selectedDocument } setSelectedDocument={setSelectedDocument} setModifiedNumberLine={setModifiedNumberLine}  setDocuments={setDocuments} documents={documents} getHeaderType={getHeaderType}  />
        </div>
        <div style={{ width: "50%" }} >
          <RenderHTML document={ selectedDocument } />
        </div>
      </div>
      <label> { "Línea modificada:   " + modifiedNumberLine } </label>
    </div>
  )
}

export default function Home() {
  const [ documents, setDocuments ]= useState([])
  const fetch = () => {
    fetchDocuments().then( res => {
      setDocuments(res) 
    })
  }
  useEffect(()=>{
    fetch()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Alex's Editor</title>
      </Head>

      <h4 >
        Welcome to Alejandro Del Morals Basic Markdown Editor
      </h4>
      <MainPage className={styles.main} documents={documents} setDocuments={setDocuments} fetch={fetch} /> 
      <footer className={styles.footer}>
        By Alejandro Del Moral
      </footer>
    </div>
  )
}


const fetchDocuments = async () => {
  try{
    const url = "http://localhost:1323/files"
    const rawResponse = await fetch( url, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const responseJson = await rawResponse.json()
    return responseJson
  }catch( err ){
    console.log( "Error al momento de guardar documento, Error:    ", err  )
  }
}

const patchDocument = async document => {
  try{
    const bodyA = { ...document }
    const url = "http://localhost:1323/upload"
    const rawResponse = await fetch( url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( bodyA )
    })
    const responseJson = await rawResponse.json()
    console.log( responseJson  )
  }catch( err ){
    console.log( "Error al momento de guardar documento, Error:    ", err  )
  }
}

const deleteDocument = async (document, fetchDocuments, setSelectedDocument) => {
  try{
    const url = `http://localhost:1323/delete/${ document.id }`
    const rawResponse = await fetch( url,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const responseJson = await rawResponse.json()
    if (responseJson){
      setSelectedDocument( null )
      fetchDocuments()
    }
  }catch( err ){
    console.log( "Error al momento de guardar documento, Error:    ", err  )
  }
}
const noteswrapper = document.getElementById("notes-wrapper");
const title  = document.getElementById("title");
const content  = document.getElementById("content");
const error  = document.getElementById("form-error");
const noteId = document.getElementById("uid");
const updateButton = document.getElementById("updated")

let notesData = [];

const getLocalStorageData =()=>{
    let notesData= [];
    let localStringData = localStorage.getItem("notes")
    if(localStringData){
        notesData= JSON.parse(localStringData)
    }  
    return notesData;  
}

const setLocalStorageData = (localStorageData)=>{
    localStorage.setItem("notes", JSON.stringify(localStorageData));
}
const deleteLocalStorageData = (key)=>{
    localStorage.removeItem(key);
    // viewData();
    window.location.reload()
}

const updateItem= (uid)=>{
    // console.log("success",uid)
    let localStorageData = getLocalStorageData()
    updateButton.innerHTML="Update Note";
    
    localStorageData.map((item,index)=>{
        if(item.uid == uid){            
             noteId.value=uid;
             title.value=item.title;
             content.value=item.text;           
            // console.log("Succesfully updated data")            
        }

    })     
}

const deleteItem= (uid)=>{
    let localStorageData = getLocalStorageData();
    let modifyData = []
    localStorageData.map((item,index)=>{
        // alert("are you sure delete this item")
        if(item.uid != uid){            
            console.log(uid,item)
            modifyData.push(item)
        }
    })
    // console.log(localStorageData)
    setLocalStorageData(modifyData)
    window.location.reload();
        
}
const viewData = () =>{    
    let localStorageData = getLocalStorageData();
    let html="<table>";
    html += `<tr>    
    <th>Title</th>
    <th>Content</th>
    <th>Created At</th>
    <th>Id</th>
    <th>Action</th>
  </tr>`

    localStorageData.map((item,index)=>{
        console.log("item",index,item)
        html += `        
        <tr>
            <td>${item.title}</td>
            <td>${item.text}</td>
            <td>${item.date}</td>
            <td>${item.uid}</td>
            <td>
            <button onclick=updateItem(${item.uid}) >Update</button>
            <button onclick=deleteItem(${item.uid})>Delete</button>
            </td>
        </tr>
        `
        noteswrapper.innerHTML= html

    })

    html += "</table>"
    

}
viewData()

const addNote = () =>{
    // console.log(title.value.length == 0,content.value.length == 0)
    if(title.value.trim().length <= 0) {
        error.innerHTML = "please Write your title";        
    }
    else if(content.value.trim().length <= 0) {
        error.innerHTML = "please Write your content";        
    }
    else{
        error.innerHTML = "";
    }
    let localStorageData= getLocalStorageData();

    if(!noteId.value){
        const noteObj = {
            uid: new Date().getTime().toString(),
            title: title.value,
            text: content.value,
            date: new Date().toLocaleDateString()
        };
        localStorageData.push(noteObj)
        setLocalStorageData(localStorageData)  
    } 
    else{
        updateButton.innerHTML="Add Note"
        let updateData = []
        localStorageData.map((item,index)=>{
            if(item.uid==noteId.value){
                const noteObj = {
                    uid: item.uid,
                    title: title.value,
                    text: content.value,
                    date: item.date
                };
                updateData.push(noteObj)
                
            }
            else{
                updateData.push(item)
            }
        })
        setLocalStorageData(updateData)
    }     
     
    
     title.value="";
     content.value="";
     noteId.value="";
     viewData();    
}

const cancel = ()=>{
    title.value="";
     content.value="";
     noteId.value="";
}





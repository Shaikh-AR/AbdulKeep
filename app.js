const addButton = document.getElementById("add");

const setLocalStorageData = ()=>{
    const textAreaData = document.querySelectorAll("textarea");
    const notes =[];
    textAreaData.forEach((note)=>{
        return notes.push(note.value)
    })
    localStorage.setItem("notes",JSON.stringify(notes));
}
const addNewNote = (text ="") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const innerData = `
  <div class="tools">
  <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="delete"><i class="fa-solid fa-trash"></i></button>
</div>
  <div class="main ${text ? '' :'hidden'}"></div>
  <textarea class="${text ? 'hidden' :''}"></textarea>
  `;
  note.insertAdjacentHTML("afterbegin",innerData);

  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

// deleting the node
delButton.addEventListener("click",()=>{
    note.remove();
    setLocalStorageData();
})

// edit button 
textArea.value = text;
mainDiv.innerHTML = text;

editButton.addEventListener("click",()=>{
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
})

textArea.addEventListener("change",(event)=>{
    const value = event.target.value;
    mainDiv.innerHTML = value;

    setLocalStorageData();
})
document.getElementById("note-section").appendChild(note);
//   document.body.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem("notes"));
if(notes){
    notes.forEach((note)=>{
        addNewNote(note);
    });
}

addButton.addEventListener("click", () => addNewNote());

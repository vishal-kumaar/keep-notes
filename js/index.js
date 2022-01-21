// if user adds a note, Add it to the localStorage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', (e) => {
    let addTitle = document.getElementById('addTitle');
    let addText = document.getElementById('addText');
    let obj = {
        title: addTitle.value,
        text: addText.value,
        isMarked: "false"
    };
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(obj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTitle.value = "";
    addText.value = "";
    showNotes();
});

// function to show element from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="my-2 mx-2 card noteCard" style="width: 18rem;">
            <i class='bx bxs-star star' id="${index}" onclick="isImportant(this.id)" style="color: red; text-align: right; margin-top: 6px; font-size: 20px;"></i>
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`
    });

    let notesElem = document.getElementById('notes');
    if (notesObj.length == 0) {
        notesElem.innerHTML = `<p>Nothing to show! Use "Add a note" section above to add notes</p>`
    } else {
        notesElem.innerHTML = html;

    }

    // for changing the class of star to mark it as important
    notesObj.forEach((element, index) => {
        let star = document.getElementById(index);
        if (element.isMarked == "true") {
            star.classList.remove('bx-star');
        } else {
            star.classList.toggle('bx-star');
        }
    });
}

// function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// for searching the notes
let search = document.getElementById('searchTxt');
search.addEventListener('input', () => {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach((element) => {
        let titleTxt = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal) || titleTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
});

// function for marking a note as important
function isImportant(index) {
    let star = document.getElementById(index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let starVal = notesObj[index].isMarked;
    if (starVal == "false") {
        starVal = starVal.replace("false", "true");
    } else {
        starVal = starVal.replace("true", "false");
    }

    notesObj[index].isMarked = starVal;
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}
// for displaying mark notes
// let notes = document.getElementsByClassName('noteCard');

showMarknote();

function showMarknote() {
    let localNotes = localStorage.getItem('notes');
    let notesObj;
    let markNotes = [];
    if (localNotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(localNotes);
    }
    notesObj.forEach(element => {
        if (element.isMarked == "true") {
            markNotes.push(element);
        }
    });

    let html = "";
    notesObj.forEach((element, index) => {
        if (element.isMarked == "true") {
            html += `
                <div class="my-2 mx-2 card noteCard" style="width: 18rem;">
                <i class='bx bxs-star star' id="${index}" onclick="isImportant(this.id)" style="color: red; text-align: right; margin-top: 6px; font-size: 20px;"></i>
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
                </div>`
        }
    });

    let markNotesElem = document.getElementById('markNotes');
    if (markNotes.length == 0) {
        markNotesElem.innerHTML = `<p>Nothing to show! Use "Mark a note" section above to add notes</p>`
    } else {
        markNotesElem.innerHTML = html;
    }
};

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
    showMarknote();
};

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
    showMarknote();
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
    });

});
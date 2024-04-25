var buttonCreateNote = document.getElementById('createNote');

let notes = [
  { id: 1, title: "Nota 1", text: "Texto da Nota 1" },
  { id: 2, title: "Nota 2", text: "Texto da Nota 2" }
];
let currentId = 3; // Inicializar o ID para novas notas
let editingNote = null;

buttonCreateNote.addEventListener('click', function(event) {
  event.preventDefault();
  console.log("Click")
  document.getElementById('noteTitle').value = '';
  document.getElementById('noteText').value = '';
  document.getElementById('noteForm').style.display = 'block';
  console.log("formulario deve aparecer na tela")
  editingNote = null;
});

document.getElementById('save').addEventListener('click', function(event) {
  event.preventDefault();
  saveNote();
});

function displayNotes() {
  const container = document.getElementById('notesContainer');
  container.innerHTML = '';
  notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.innerHTML = `
          <h3>${note.title} <span class="edit" onclick="editNote(${note.id})">&#9998;</span> <span class="delete" onclick="deleteNote(${note.id})">&#128465;</span></h3>
          <p>${note.text}</p>
      `;
      container.appendChild(noteElement);
  });
}

function saveNote() {
  const title = document.getElementById('noteTitle').value;
  const text = document.getElementById('noteText').value;

  if (editingNote) {
      const note = notes.find(n => n.id === editingNote);
      note.title = title;
      note.text = text;
  } else {
      notes.push({ id: currentId++, title, text });
  }

  document.getElementById('noteForm').style.display = 'none';
  displayNotes();
}

function editNote(id) {
  const note = notes.find(n => n.id === id);
  document.getElementById('noteTitle').value = note.title;
  document.getElementById('noteText').value = note.text;
  document.getElementById('noteForm').style.display = 'block';
  editingNote = id;
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  displayNotes();
}

function closeForm() {
  document.getElementById('noteForm').style.display = 'none';
}

displayNotes();

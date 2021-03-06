const addBtn = document.getElementById('add')
const removeBtn = document.getElementById('clear')
const notes = JSON.parse(localStorage.getItem('notes'))

// document.addEventListener('DOMContentLoaded', () => {
//   tippy('[data-tippy-content]');
// })

tippy('[data-tippy-content]')


if(notes) {
  notes.forEach(note => {
    addNewNote(note)
  })
}

addBtn.addEventListener('click', () => addNewNote()
)

removeBtn.addEventListener('click', () => removeNotes())

function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')

  note.innerHTML = `
  <div class="tools">
        <button class="btn edit" data-tippy-content="Edit Note"><i class="bi bi-pencil-square"></i></button>
        <button class="btn delete"><i class="bi bi-trash" data-tippy-content="Delete Note"></i></button>
      </div>
      
      <div class="main ${text ? '' : "hidden"}"></div>
        <textarea class = ${text ? "hidden" : ''}></textarea>
  `
  const editBtn = note.querySelector('.edit')
  const deleteBtn = note.querySelector('.delete')
  const main = note.querySelector('.main')
  const textArea = note.querySelector('textarea')

  textArea.value = text
  main.innerHTML = marked(text)

  deleteBtn.addEventListener('click', () => {
    note.remove()

    updateLS()
  })

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })

  textArea.addEventListener('input', (e) => {
    const { value } = e.target
    main.innerHTML = marked(value)

    updateLS()
  })

  document.body.appendChild(note)
}

function removeNotes() {
  const note = document.querySelectorAll('.note')
  note.forEach(note => document.body.removeChild(note))

  localStorage.clear('notes')
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea')

  const notes = []

  notesText.forEach(note => {
    notes.push(note.value)
  })

  localStorage.setItem('notes', JSON.stringify(notes))
}
const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    // const notes = require('./db.json')
    // const note = Buffer.from(buffer).toString('utf-8')
 const notes = await getNotes()
    console.log(notes)


    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('note was added!'))

}

async function getNotes() {
    const note = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return  Array.isArray(JSON.parse(note)) ? JSON.parse(note) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note=> {
        console.log(chalk.blue(note.id), chalk.blue.inverse(note.title))
    })
}

async function removeNoteById(id) {
    const notes = await getNotes()
    const newArray = notes.filter((el) => el.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(newArray))
    console.log(chalk.red('Remove note by id:', id))
}

module.exports = {
    addNote, printNotes, removeNoteById
}
import { operationsWithBoards } from "../support/functions"

describe('trello', () => {
    it('creates a board', () => {
        operationsWithBoards.createBoard('boom')
    })

    it('creates a list', () => {
        operationsWithBoards.createList('TODO')
    })

    it('creates a card', () => {
        operationsWithBoards.createCard('baam', 'TODO')
    })

    it('creates another list', () => {
        operationsWithBoards.createList('DONE')
    })

    it('moves the card', () => {
        operationsWithBoards.moveCard('DONE')
    })

    it('deletes the board', () => {
        operationsWithBoards.deleteBoard()
    })
})
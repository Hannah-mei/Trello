const userCredentials = {
    key: 'cbfbe9459c74b47e7ff36154e638b4eb',
    token: 'ATTA2919baf315a330c56d2b9248baf29bf5570f458d974ff0ea06f4974c532cb128FF5714F7'
}

let idBoard;
let idList;
let idCard;
let lists = {}

export class OperationsWithBoards {
    createBoard (name) {
        cy.request({
            url: "https://api.trello.com/1/boards/",
            method: "POST",
            body: {
                'token': userCredentials.token,
                'key': userCredentials.key,
                'name': name,
            }
        }).then(boardResponse => {
            expect(boardResponse.status).to.equal(200)
            idBoard = boardResponse.body.id
        })
    }

    createList(name) {
        cy.request({
            url: '/1/lists',
            method: 'POST',
            body: {
                'token': userCredentials.token,
                'key': userCredentials.key,
                'name': name,
                'idBoard': idBoard
            }
        })
        .then(listResponse => {
            expect(listResponse.status).to.equal(200)
            expect(listResponse.body.name).to.equal(name)
            expect(listResponse.body.idBoard).to.equal(idBoard)
            expect(listResponse.body.closed).to.equal(false)
            idList = listResponse.body.id
            lists[name] = listResponse.body.id
        })
    }

    createCard(name, list) {
        cy.request({
            url: '/1/cards',
            method: 'POST',
            body: {
                'token': userCredentials.token,
                'key': userCredentials.key,
                'name': name,
                'idList': lists[list]
            }
        })
        .then(cardResponse => {
            expect(cardResponse.status).to.equal(200)
            expect(cardResponse.body.badges.votes).to.equal(0)
            expect(cardResponse.body.badges.attachments).to.equal(0)
            idCard = cardResponse.body.id
        })
    }

    moveCard(list) {
        cy.request({
            url: '/1/cards/'+idCard,
            method: 'PUT',
            body: {
                'idList': lists[list],
                'token': userCredentials.token,
                'key': userCredentials.key,                       
            }
        })
    }

    deleteBoard() {
        cy.request({
            url: '/1/boards/'+idBoard,
            method: 'DELETE',
            body: {
                'token': userCredentials.token,
                'key': userCredentials.key,                       
            }
        })
        cy.request({
            url: '/1/members/hannayakovlieva1/boards',
            method: 'GET',
            body: {
                'token': userCredentials.token,
                'key': userCredentials.key,
            }
        }).its('body').then(body => {
            if (body[0]) {
                idBoard = body[0].id
                this.deleteBoard()
            } 
        })        
    }
}

export const operationsWithBoards = new OperationsWithBoards()
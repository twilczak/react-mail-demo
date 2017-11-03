import axios from 'axios';

export class MailService {

    static hostUrl = 'http://localhost:3000';

    static getMessages(mailbox) {
        const url = `${this.hostUrl}/` + mailbox.split('/').join('');
        return axios
            .get(url)
            .catch(this.handleError);
    }

    static getMessage(mailbox, id) {
        const url = `${this.hostUrl}/${mailbox}`;
        return axios
            .get(url)
            .then(response => {
                return response.data.find(message => message.id === id);
            })
            .catch(this.handleError);
    }

    static deleteMessage(mailbox, id) {
        const url = `${this.hostUrl}/${mailbox}/${id}`;
        return axios
            .delete(url)
            .then(response => {
                console.log(response);
            })
            .catch(this.handleError);
    }

    static handleError(error) {
        console.error(error);
    }
}
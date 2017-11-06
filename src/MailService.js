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
            .catch(this.handleError);
    }

    static sendMessage(message) {
        const url = `${this.hostUrl}/outbox`;
        message.dateSent = this.getDateSent();

        return axios
            .post(url, message)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(this.handleError);
    }

    static zeroPad(value) {
        return value > 9 ?  '' + value : '0' + value;
    }

    static getDateSent(date = new Date()) {
        const day = this.zeroPad(date.getDate());
        const month = this.zeroPad(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${year}.${month}.${day}`;
    }

    static handleError(error) {
        console.error(error);
    }
}
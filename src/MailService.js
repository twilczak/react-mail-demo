import axios from 'axios';

export class MailService {

    static hostUrl = 'http://localhost:3000';

    static getMessages(mailbox) {
        const url = `${this.hostUrl}/` + mailbox.split('/').join('');
        return axios
            .get(url)
            .catch(this.handleError);
    }

    static handleError(error) {
        console.error(error);
    }
}
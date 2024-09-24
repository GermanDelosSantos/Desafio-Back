import MongoDao from '../mongo.dao.js';
import { TicketModel } from './models/ticket.model.js';

export default class TicketDao extends MongoDao {
    constructor() {
        super(TicketModel);
    }

    async getTicketByUserId(userId) {
        return await this.model.findOne({ userId });
    }

    async getTicketByTicketId(ticketId) {
        return await this.model.findById(ticketId);
    }
}
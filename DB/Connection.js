const dotenv = require("dotenv");
dotenv.config();

const mongodb = require("mongodb");
const URI = process.env.URI;

/*
* Database class: 
* This is where interactions with the database happen
*/
class DB {
    constructor() {
        this.client;
    }
    /*
    * This method gets the mongo client object
    * It's called all other methods 
    */
    refresh() {
        this.client = new mongodb.MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    /*
    * Method to test connection to DB
    */
    async testConnection() {
        // Refresh the mongo client
        this.refresh();
        try {
            await this.client.connect();
            console.log("Database connected");
            this.client.close();
        } catch(e) {
            console.error("Could not connect to the database: " + e);
        }
    }

    /*
    * This method gets all of the inquires in the DB
    */
   async showAllInquiries() {
        // Refresh the mongo client
        this.refresh();
        try {
            // Connect the client
            await this.client.connect();
            // Pull from the Inquiries Collectiomn in the JanessaCummingsPhotography DB 
            const pointer = this.client.db("JanessaCummingsPhotography").collection("Inquiries").find();
            const results = await pointer.toArray();
            this.client.close()
            return results;
        } catch(e) {
            console.error("Could not get all Inquiries: " + e);
        }
   }
   /*
   * This method adds the given values as a new document in the 
   * Inquiries Collection in the JanessaCummingsPhotography DB
   */
   async addInquiry(body) {
        // Refresh the mongo client
        this.refresh();
        try {
            await this.client.connect();
            const result = await this.client.db("JanessaCummingsPhotography").collection("Inquiries").insertOne(body);
            this.client.close();
            return result;
        } catch(e) {
            console.error("Could not add Inquiry. If error occurs again please contact owner. " + e);
        }
    }

    /**
     * This method edits the given Inquiry with the provided values.
     * It looks up and retrieves the inquiry by the id passed in from the body
     * from the database and then updates it with all the items in the body.
     */
    async updateInquiry(body) {
        this.refresh();
        try {
            await this.client.connect();
            const result = await this.client.db("JanessaCummingsPhotography").collection("Inquiries").findOneAndUpdate(
                { "_id" : mongodb.ObjectId(body["id"]) },
                { $set : body }
            );
            this.client.close();
            return result;
        } catch (e) {
            console.error("Could not update Inquiry: " + body["id"] + " "  + e);
            return 500;
        }
    }

    /**
     * This method deletes an Inquiry from the Database.
     * It uses the id from the body passed in to find which 
     * Document to delete from the database. 
     */
    async deleteInquiry(body) {
        this.refresh();
        try {
            await this.client.connect();
            const result = await this.client.db("JanessaCummingsPhotography").collection("Inquiries").findOneAndDelete(
                { "_id" : mongodb.ObjectId(body["id"]) }
            );
            if (result == null) 
                return 400;
            this.client.close();
            return result;
        } catch (e) {
            console.error("Could not delete user: " + e);
            return 500;
        }
    }
}

module.exports = DB;
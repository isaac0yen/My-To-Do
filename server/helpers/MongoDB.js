import { MongoClient, ObjectId } from 'mongodb';

class MongoDBWrapper {
  constructor(connectionString, dbName) {
    this.client = new MongoClient(connectionString, { useNewUrlParser: true});
    this.dbName = dbName;
  }

  async connect() {
    console.log('attempting to connect')
    await this.client.connect().then(()=>{

      console.log('attempting to bleh')
    });
    this.db = this.client.db(this.dbName);
  }

  async close() {
    await this.client.close();
  }

  insertOne(collectionName, data) {
    return this.db.collection(collectionName).insertOne(data);
  }

  insertMany(collectionName, data) {
    return this.db.collection(collectionName).insertMany(data);
  }

  upsertOne(collectionName, data) {
    const filter = this.buildFilter(data);
    return this.db.collection(collectionName).updateOne(filter, { $set: data }, { upsert: true });
  }

  upsertMany(collectionName, data) {
    const operations = data.map((item) => ({
      updateOne: {
        filter: this.buildFilter(item),
        update: { $set: item },
        upsert: true,
      },
    }));
    return this.db.collection(collectionName).bulkWrite(operations);
  }

  insertIgnoreOne(collectionName, data) {
    return this.db.collection(collectionName).insertOne(data);
  }

  insertIgnoreMany(collectionName, data) {
    return this.db.collection(collectionName).insertMany(data, { ordered: false });
  }

  updateOne(collectionName, data, condition) {
    const filter = this.buildFilter(condition);
    return this.db.collection(collectionName).updateOne(filter, { $set: data });
  }

  updateMany(collectionName, data, condition) {
    const filter = this.buildFilter(condition);
    return this.db.collection(collectionName).updateMany(filter, { $set: data });
  }

  deleteOne(collectionName, condition) {
    const filter = this.buildFilter(condition);
    return this.db.collection(collectionName).deleteOne(filter);
  }

  deleteMany(collectionName, condition) {
    const filter = this.buildFilter(condition);
    return this.db.collection(collectionName).deleteMany(filter);
  }

  findOne(collectionName, condition) {
    const filter = this.buildFilter(condition);
    return this.db.collection(collectionName).findOne(filter);
  }

  findMany(collectionName, condition) {
    return this.db.collection(collectionName).find(this.buildFilter(condition)).toArray();
  }

  findAll(collectionName) {
    return this.db.collection(collectionName).find({}).toArray();
  }

  findDirect(query, params) {
    return this.db.collection(query).find(params).toArray();
  }

  updateDirect(query, params) {
    return this.db.collection(query).updateMany({}, { $set: params });
  }

  deleteDirect(query, params) {
    return this.db.collection(query).deleteMany(params);
  }

  executeDirect(query) {
    return this.db.collection(query).deleteMany({});
  }

  transaction() {
    return this.db.beginTransaction();
  }

  commit() {
    return this.db.commitTransaction();
  }

  rollback() {
    return this.db.abortTransaction();
  }

  listAllTableNames() {
    // MongoDB doesn't have tables in the same way as SQL databases
    return [];
  }

  async deleteDB() {
    await this.db.dropDatabase();
  }

  // Helper method to build the filter based on any key-value pair
  buildFilter(condition) {
    const filter = {};
    for (const key in condition) {
      if (Object.prototype.hasOwnProperty.call(condition, key)) {
        filter[key] = key === '_id' ? new ObjectId(condition[key]) : condition[key];
      }
    }
    return filter;
  }
}

export default MongoDBWrapper
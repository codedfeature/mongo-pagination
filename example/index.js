const client = require('./mongo');
const mongoPagination = require('../');

const Main = async () => {
    try {

        //connect to Mongo Server
        await client.ping();

        //configure connection injection using main collection
        const mongoConfig = {
            client: client.getDb().db(), //mongo client
            collection: 'user' // user collection
        };

        //payload is user filter to the pagination
        const payload = {
            search = 'from fieldSearch', // or set it to {} and/or null
            sortType: "ASC", // 1 | 0 | 'DESC'
            page: 1, //default
            size: 10, //default
        }
        // or const payload = {}

        const fieldSearch = ['first_name', 'last_name', 'email', 'gender', 'countryId', 'status'];

        //collection aggregation/join
        const aggregation = [
            {
                collectionName: 'country', //country collection
                uniqueId: 'countryId' //uniqueId
            }
        ];

        const pagination = await mongoPagination.buildPagination(
            mongoConfig,
            payload = {},
            fieldSearch,
            projection = null,
            aggregation
        );

        console.log(JSON.stringify(pagination));
        return pagination;
    } catch (error) {
        console.log(error.message);
    }
}

Main()

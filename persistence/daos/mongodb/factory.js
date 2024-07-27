import ProductDaoMongo from "../mongodb/product.dao.js";
import ProductDaoFS from '../filesystem/product.dao.js';
import CartDaoMongoDB from '../mongodb/cart.dao.js';
import UserDaoMongo from "../mongodb/user.dao.js";
import { initMongoDB } from '../../../db/database.js';

let prodDao = null;
let userDao = null;
let cartDao = null;

let persistence = process.argv[2];

switch (persistence) {
    case 'fs':
        prodDao = new ProductDaoFS('./src/persistence/daos/filesystem/products.json');
        // userDao = new UserDaoFS('./src/daos/....
        // cartDao = new
        break;
    case 'mongo':
        initMongoDB();
        userDao = new UserDaoMongo();
        prodDao = new ProductDaoMongo();
        cartDao = new CartDaoMongoDB();
        break;
    // case 'sql':
    //     userDao = new UserDaoSql();
    //     prodDao = new ProductDaoSql();
    //     cartDao = new CartDaoSqlDB();
    default:
        // initMongoDB();
        userDao = new UserDaoMongo();
        prodDao = new ProductDaoMongo();
        cartDao = new CartDaoMongoDB();
    break;
}

export default { userDao, prodDao, cartDao };
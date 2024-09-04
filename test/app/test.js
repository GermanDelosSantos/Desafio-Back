import { describe, test, before } from "node:test";
import assert from "node:assert";
import { generateFakerProduct } from '../../src/utils/product.utils.js'
import { logger } from "../../logs/logger.js";


const apiURL = "http://localhost:8080/test";


describe('TESTS API DESBORDADAS', ()=>{
    before(async()=> await fetch(apiURL, { method: 'DELETE' }));

    test('[GET] /test-getallprod', async()=>{

        const response = await fetch(apiURL);
        console.log(response);
        const responseJson = await response.json();
        assert.strictEqual(Array.isArray(responseJson), true);
        assert.equal(responseJson.length, 0);
    })

    // test('[POST] /test-createprod', async()=>{
    //     const body = generateFakerProduct();
    //     const response = await fetch(apiURL, {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(body)
    //     });
    //     const responseJson = await response.json();

    //     assert.ok(responseJson, '_id');
    //     assert.equal(body.title, responseJson.title);
    //     assert.equal(response.status, 200)
    // })
})


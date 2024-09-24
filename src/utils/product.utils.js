import { faker } from '@faker-js/faker';

export const generateFakerProduct = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.commerce.price({ min: 100, max: 200 }),
    }

}
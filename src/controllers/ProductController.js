import Product from '../models/ProductModel.js';



const registerProduct = async (productData) => {

    const { name, stock, price, category, nameShop, description } = productData;



    if (name == "" || stock == null || category == "" || nameShop == "" || price == null || description == "") {

        return ({ "Status": "Failure", "Description": "All data is required" });
    }
    else {

        try {
            await Product.create(
                {
                    name: name,
                    price: price,
                    stock: stock,
                    category: category,
                    nameShop: nameShop,
                    description: description,
                    active: true


                }
            )
            return ({ "Status": "Success", "Description": "Product Create successfully" })
        } catch (error) {
            return ({ "Status": "Failure", "Description": "The Query failure" });
        }


    }
}

const findProducts = async () => {
    const response = await Product.exists();
    if (response) {
        const DBData = await Product.find({ active: true });
        return ({ "Status": "Success", "Description": "Products Found", "Data": DBData });
    } else {

        return ({ "Status": "Failure", "Description": "No products founds" });
    }
}

const findSelectProducts = async nameShopfunction => {

    const { nameShop } = nameShopfunction;
    const response = await Product.exists({ nameShop: nameShop })


    if (response) {
        const DBData = await Product.find({ nameShop: nameShop });
        return { "Status": "Success", "Description": "Product Found", "Data": DBData };
    } else {
        return ({ "Status": "Failure", "Description": `There are no products with a nameshop like ${nameShop}` });
    }
}

const update = async product => {
    const { _id, name, nameShop, stock, category } = product;

    if (name == "" || nameShop == "" || stock == "" || category == "") {

        return ({ "Status": "Failure", "Description": "All data is required" });
    }
    else {
        try {
            await Product.updateOne({ _id: _id },
                {

                    $set: {

                        name: name,
                        stock: stock,
                        category: category,
                        nameShop: nameShop,
                        active: true
                    }

                }
            )
            return { "Status": "Success", "Description": "The product has been successfully updated" };

        } catch (error) {

            return ({ "Status": "Failure", "Description": `The query failure with the error ${error}` });

        }

    }

}

const deleteProduct = async product => {
    const { _id, name, price, nameShop, stock, category, description } = product;

    try {
        await Product.updateOne({ _id: _id },
            {

                $set: {

                    name: name,
                    price: price,
                    stock: stock,
                    category: category,
                    nameShop: nameShop,
                    description: description,
                    active: false
                }

            }
        )
        return { "Status": "Success", "Description": "The product has been successfully deleted" };

    } catch (error) {

        return ({ "Status": "Failure", "Description": `The query failure with the error ${error}` });

    }
}


const productController = { registerProduct, findProducts, findSelectProducts, update, deleteProduct };

export default productController;
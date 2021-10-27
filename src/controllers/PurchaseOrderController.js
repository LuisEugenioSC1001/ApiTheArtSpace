import PurchaseOrder from "../models/PurchaseOrderModel";

const newOrder = async (orderData) => {
    const { date, user } = orderData;
    try {
        await PurchaseOrder.create(
            {
                date: date,
                products: [],
                user: user,
                active: true
            }
        )
        return ({ "Status": "Success", "Description": "Product order Create successfully" })
    } catch (error) {
        return ({ "Status": "Failure", "Description": "The Query failure" });
    }
}
const updateOrder = async (props) => {
    const { _id, products, date } = props;
    try {
        await PurchaseOrder.updateOne({ _id: _id },
            {

                $set: {
                    date: date,
                    products: products,
                }
            }
        )
        return { "Status": "Success", "Description": "The product order has been successfully updated" };

    } catch (error) {

        return ({ "Status": "Failure", "Description": `The query failure with the error ${error}` });

    }

}
const cancelledOrder = async (props) => {
    const { _id } = props;
    try {
        await PurchaseOrder.updateOne({ _id: _id },
            {
                $set: {
                    active: false,
                }
            }
        )
        return { "Status": "Success", "Description": "The product order has been successfully cancelled" };

    } catch (error) {

        return ({ "Status": "Failure", "Description": `The query failure with the error ${error}` });

    }

}
const PurchaseOrderController = { newOrder, updateOrder, cancelledOrder};

export default PurchaseOrderController;


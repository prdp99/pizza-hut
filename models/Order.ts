import { Schema, models, model } from 'mongoose'

const OrderSchema = new Schema({
    orderId: {
        type: String,
        unique: true,
        // required: true,
    },
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    productId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    extraOption: {
        type: String,
        required: true

    },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'on the way', 'delivered', 'cancelled'],
        default: 'pending',
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerDescription: {
        type: String,
    },
}, { timestamps: true });


OrderSchema.pre('save', async function (next) {

    console.log('presave fn running')
    // Skip if orderId is already set
    if (this.orderId) {
        return next();
    }

    try {
        // Get the current date
        const date = new Date();
        // Format: PZA + YYMMDD + 4-digit sequential number
        const prefix = 'PZA';
        const datePart = date.getFullYear().toString().substr(-2) +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            date.getDate().toString().padStart(2, '0');

        // Find the highest sequential number for today
        const lastOrder = await this.constructor.findOne(
            { orderId: new RegExp('^' + prefix + datePart) },
            { orderId: 1 },
            { sort: { orderId: -1 } }
        );

        let sequentialNumber = '0001';

        if (lastOrder && lastOrder.orderId) {
            // Extract the sequential part and increment
            const lastSequential = lastOrder.orderId.substr(-4);
            sequentialNumber = (parseInt(lastSequential, 10) + 1).toString().padStart(4, '0');
        }

        // Set the orderId
        this.orderId = `${prefix}${datePart}${sequentialNumber}`;
        next();
    } catch (error) {
        next(error);
    }
});

export default models.Order || model("Order", OrderSchema);

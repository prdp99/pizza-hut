import { Schema, models, model } from 'mongoose'
const CartSchema = new Schema({
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,


    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product"
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

        }
    ],
    totalCartPrice: {
        type: Number,
        required: true,
        default: 0

    }

}, { timestamps: true });

export default models.Cart ||
    model("Cart", CartSchema);
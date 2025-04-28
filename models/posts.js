const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const customerSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
     ],
    },
    { timestamps: true }
  );  

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

module.exports = {Order, Customer};

customerSchema.post("findOneAndDelete",async(customer) => {
    if(customer.orders.length){
        let res = await Order.deleteMany({_id: {$in: customer.orders}});
        console.log(res);
    }
});


const findCustomer = async() => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
}


const addCust =async () => {
 let newCust = new Customer({

 })

 let newOrder = new Order({
    
 })

 newCust.orders.push(newOrder);

 await newOrder.save();
 await newCust.save();
 console.log("added new customer");
}

const delCust = async () => {
    let data = await Customer.findByIdAndDelete();
    console.log(data);
}
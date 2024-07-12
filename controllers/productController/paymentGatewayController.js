import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../../models/productModel/orderModel.js";
dotenv.config();


var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


//payment gateway for token api
export const tokenController = async (req, res) => 
  {
  try 
  {
    gateway.clientToken.generate({}, function(error, response) 
    {
      if (error) 
      {
        res.status(500).send(error);
      } 
      else
      {
        res.send(response); // send the clientToken only
      }
    });
  } catch (error) 
  {
    console.log(`get token for payment controller error = ${error}`);
    res.status(500).send(error);
  }
};



//payments 
export const paymentController = async (req, res) =>
{
  try
  {
    const {nonce, cart, quantities, total} = req.body;
  
    let newTransaction = gateway.transaction.sale(
    {
      amount: total,
      paymentMethodNonce: nonce,
      options:
      {
        submitForSettlement: true
      },
    }, 
    function(error, result)
    {
      if(result)
      {
        const order = new orderModel(
        {
          products: cart, 
          quantities:quantities,
          payment: result, 
          client: req.user._id 
        }).save();
        console.log(cart);
        res.json({ok: true});
      }
      else
      {
        res.status(500).send(error)
      }
    })
  }
  catch(error)
  {
    console.log(`payment controller error = ${error}`);
  }
}

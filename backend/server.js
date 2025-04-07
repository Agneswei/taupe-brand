const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51RB5rjPiC94MDr5S9hTA6NUYczj2nPeaqU0FWkwlcPxix0uh8bgVjAzkjsrU2KC1wDmZAJbn10VMw5drlovZGkcK00PFSxZv8l'); // Replace with your secret key

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Create payment intent endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'cad' } = req.body;
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
    
    // Send the client secret to the client
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
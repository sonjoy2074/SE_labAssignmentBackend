import { Router, Request, Response } from "express";
import connection from "../config/db";
import {Product} from "./admin.module";

const router = Router();

const createProduct = (req: Request, res: Response) => {
  if (req.body) {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
    };

    connection.query('INSERT INTO products SET ?', product, (err, results) => {
      if (err) {
        console.error('Error inserting product: ', err);
        res.status(500).json({ error: 'Failed to create product' });
        return;
      }
      res.status(201).json({ message: 'Product inserted successfully' });
    });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
};

const editProduct = (req: Request, res: Response) => {
  if (req.body && req.body.id) {
    const productId = req.body.id;
    const updatedProduct: Product = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
    };

    connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, productId], (err, results) => {
      if (err) {
        console.error('Error updating product: ', err);
        res.status(500).json({ error: 'Failed to update product information' });
        return;
      }
      res.status(200).json({ message: 'Product updated successfully' });
    });
  } else {
    res.status(400).json({ error: 'Invalid request or missing product ID' });
  }
};

const getAllProducts = (req: Request, res: Response) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products: ', err);
      res.status(500).json({ error: 'Failed to fetch product information' });
      return;
    }

    res.status(200).json(results);
  });
};

router.post('/', createProduct);
router.put('/:id', editProduct);
router.get('/showProduct', getAllProducts);

export default router;

import express, { Express } from 'express'
import { prisma } from '../../lib/prismaClient';

export function productRouter(app: Express): void {
  const router = express.Router();
  app.use('/api/products', router);

  router.get('/', async (req, res, next) => {
    const { search = '', collection = '', sort = 'price_asc' } = req.query;
  
    try {
      const filters: any = {
        where: {
          AND: [
            {
              name: {
                contains: search as string,
                mode: 'insensitive',
              },
            },
            {
              ProductCollection: {
                some: {
                  collectionId: collection ? parseInt(collection as string, 10) : undefined,
                },
              },
            },
          ],
        },
        include: {
          variants: true,
          ProductCollection: {
            include: {
              collection: true,
            },
          },
        },
      };
  
      const orderBy = sort === 'price_desc'
        ? { price: 'desc' }
        : { price: 'asc' };
  
      const products = await prisma.product.findMany({
        ...filters,
        orderBy: orderBy,
      });
  
      const formattedProducts = products.map(product => ({
        ...product,
        collections: product.ProductCollection.map(pc => pc.collection),
      }));
  
      res.status(200).json({ statusCode: 200, data: formattedProducts });
    } catch (error) {
      next({ statusCode: 500, message: 'Error fetching products' });
    }
  });


  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: { variants: true, collections: true },
      });
      if (!product) {
        return next({ statusCode: 404, message: 'Product not found' });
      }
      res.status(200).json({ statusCode: 200, data: product });
    } catch (error) {
      next({ statusCode: 500, message: 'Error fetching product' });
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const { name, description, price, image } = req.body;
      const newProduct = await prisma.product.create({
        data: { name, description, price, image },
      });
      res.status(201).json({ statusCode: 200, message: 'The product was successfully created', data: newProduct });
    } catch (error) {
      next({ statusCode: 500, message: 'Fail during creation of product' });
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: { name, description, price },
      });
      res.status(200).json({ statusCode: 200, message: 'Success', data: updatedProduct });
    } catch (error) {
      next({ statusCode: 500, message: 'Product update failed' });
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma.product.delete({
        where: { id: Number(id) },
      });
      res.status(204).json({ statusCode: 204, message: 'Product deleted' });
    } catch (error) {
      next({ statusCode: 500, message: 'Product deletion failed' });
    }
  });

  router.post('/collection', async (req, res, next) => {
    const { productId, collectionId } = req.body
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(productId) },
      });
      const collection = await prisma.collection.findUnique({
        where: { id: Number(collectionId) },
      });

      if (!product || !collection) {
        return res.status(404).json({ statusCode: 404, message: 'Product or Collection not found' });
      }

      const productCollection = await prisma.productCollection.create({
        data: {
          productId: Number(productId),
          collectionId: Number(collectionId),
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: 'Collection successfully attached to product',
        data: productCollection,
      });
    } catch (error) {
      next({
        statusCode: 500,
        message: 'Failed to attach collection to product',
        error: error,
      });
    }
  });

  router.get('/search', async (req, res, next) => {
    const { lookup } = req.query;

    if (!lookup) {
      return res.status(400).json({ statusCode: 400, message: 'Search query is required' });
    }

    try {
      const products = await prisma.product.findMany({
        where: {
          name: {
            contains: lookup,
            mode: 'insensitive',
          },
        },
        include: {
          variants: true,
          ProductCollection: {
            include: {
              collection: true,
            },
          },
        },
      });

      res.status(200).json({ statusCode: 200, data: products });
    } catch (error) {
      next({ statusCode: 500, message: 'Error searching products' });
    }
  });


}
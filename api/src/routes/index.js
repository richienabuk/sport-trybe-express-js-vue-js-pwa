import express from "express";
import path from "path";
import authRoutes from "./auth";
import sportRoutes from "./sport";

export default (app) => {
  app.get('/api/v1', (req, res) => res.status(200).send({
    status: 'success',
    data: 'Welcome to the Sport fans App API',
  }));

  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1', [sportRoutes]);

  app.use(express.static(path.join(__dirname, '../../../client/dist')));

// Create a catch-all route for testing the installation.
  app.all('/api/v1/*', (req, res) => res.status(404).send({
    message: 'Route does not exist on this server',
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
  });
};

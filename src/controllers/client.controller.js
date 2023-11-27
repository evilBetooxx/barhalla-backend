import Client from "../models/client.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes" });
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente" });
  }
};

export const updateClient = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName } = req.body;
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName },
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    return res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el cliente" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente" });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const imagenBuffer = req.file;
    const result = await cloudinary.uploader.upload(imagenBuffer.path)
    console.log(result);

    await Client.findByIdAndUpdate(req.user.id, { photo: result.secure_url }, { new: true });

    res.json(result.data);  
  } catch (error) {
    console.log(error);
  }
};

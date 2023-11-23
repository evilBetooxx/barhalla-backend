import Client from "../models/client.model.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const upload = multer();

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
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
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
  upload.single("image")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // Ocurrió un error de Multer
      return res.status(500).json({ message: "Error al procesar la imagen" });
    } else if (err) {
      // Ocurrió un error desconocido
      return res
        .status(500)
        .json({ message: "Error desconocido al procesar la imagen" });
    }

    // Si no hay errores, procede con la subida de la imagen
    cloudinary.config({
      cloud_name: "dn1ng7anm",
      api_key: "914752262761932",
      api_secret: "oyCgLbA1Ui12EAO6UT7mvrdKc-o",
    });

    const image = req.file;
    if (!image)
      return res
        .status(500)
        .json({ message: "No se ha enviado ninguna imagen" });

    try {
      const uploadedImage = await cloudinary.uploader.upload(image.path);
      res.json({ url: uploadedImage.secure_url });
    } catch (error) {
      res.status(500).json({ message: "Error al subir la imagen" });
    }
  });
};

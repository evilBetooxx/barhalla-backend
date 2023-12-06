import BarberShop from "../models/barberShop.model.js";
import Client from "../models/client.model.js";
import { v2 as cloudinary } from "cloudinary";
import { io } from "../app.js";

export const getBarberShops = async (req, res) => {
  try {
    const barberShops = await BarberShop.find();
    res.json(barberShops);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las barberías",
      error: error.message,
    });
  }
};

export const getUserBarberShops = async (req, res) => {
  console.log(req.user.id);
  try {
    const barberShops = await BarberShop.find({ owner: req.user.id});
    res.status(200).json(barberShops);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las barberías",
      error: error.message,
    });
  }
};

export const getBarberShop = async (req, res) => {
  try {
    const barberShop = await BarberShop.findById(req.params.id);
    if (!barberShop)
      return res.status(404).json({ message: "Barbería no encontrada" });
    res.json(barberShop);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la barbería", error: error.message });
  }
};

export const searchBarberShops = async (req, res) => {
  try {
    const { city, name } = req.body; 

    if (!city || !name) {
      return res.status(400).json({ error: "Faltan parámetros de búsqueda" });
    }

    const barberShops = await BarberShop.find({
      "location.city": city,
      name: name,
    });

    return res.status(200).json({ barberShops });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se pudo buscar la barbería" });
  }
};

export const createBarberShop = async (req, res) => {
  console.log(req.body);
  const { name, description, location, services, workingDays, contact, logo } = req.body;
  try {
    const newBarberShop = new BarberShop({
      name,
      description,
      location,
      services,
      workingDays,
      contact,
      logo,
      owner: req.user.id,
    });

    const client = await Client.findById(req.user.id);
    client.barberShops.push(newBarberShop._id); 
    await client.save();
    
    const savedBarberShop = await newBarberShop.save();
    io.emit("newBarberShop", savedBarberShop.name);
    res.json(savedBarberShop);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear la barbería", error: error.message });
  }
};

export const updateBarberShop = async (req, res) => {
  console.log(req.body);
  try {
    const barberShop = await BarberShop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!barberShop) {
      return res.status(404).json({ message: "Barbería no encontrada" });
    }

    res.json(barberShop);
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar la barbería",
      error: error.message,
    });
  }
};

export const deleteBarberShop = async (req, res) => {
  try {
    const barberShop = await BarberShop.findByIdAndDelete(req.params.id);
    if (!barberShop)
      return res.status(404).json({ message: "Barbería no encontrada" });
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la barbería", error: error.message });
  }
};

export const uploadLogo = async (req, res) => {
  try {
    const imagenBuffer = req.file;
    const result = await cloudinary.uploader.upload(imagenBuffer.path)
    console.log(result.secure_url);

    res.json(result.secure_url);
  } catch (error) {
    console.log(error);
  }
};

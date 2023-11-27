import BarberShop from "../models/barberShop.model.js";

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
  try {
    const barberShops = await BarberShop.find({ owner: req.params.id });
    res.json(barberShops);
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
  const { name, description, location, services, workingDays, contact, logo, photos } =
    req.body;
  const owner = req.user._id;

  try {
    const newBarberShop = new BarberShop({
      name,
      description,
      location,
      services,
      workingDays,
      contact,
      logo,
      photos,
      owner,
    });

    const savedBarberShop = await newBarberShop.save();
    res.json(savedBarberShop);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear la barbería", error: error.message });
  }
};

export const updateBarberShop = async (req, res) => {
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

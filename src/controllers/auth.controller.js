import Client from "../models/client.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const clientFound = await Client.findOne({ email });
    if (clientFound) return res.status(400).json(["El email está en uso"]);

    const passwordHash = await bcrypt.hash(password, 10);

    const newClient = new Client({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    //agregar la foto default de cada perfil

    const clientSaved = await newClient.save();
    const token = await createAccessToken({ id: clientSaved._id });
    res.cookie("token", token);
    res.json({
      id: clientSaved._id,
      firstName: clientSaved.firstName,
      lastName: clientSaved.lastName,
      email: clientSaved.email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const clientFound = await Client.findOne({ email });

    if (!clientFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, clientFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: clientFound._id });

    res.cookie("token", token);
    res.json({
      id: clientFound._id,
      firstName: clientFound.firstName,
      lastName: clientFound.lastName,
      email: clientFound.email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

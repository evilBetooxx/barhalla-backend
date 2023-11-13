import Appointment from "../models/appointment.model.js";

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      clientID: req.user.id,
    }).populate("clientID");
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las citas", error: error.message });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la cita", error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { date, time, barberShopID, paymentID } = req.body;

    const newAppointment = new Appointment({
      date,
      time,
      clientID: req.user.id,
      barberShopID,
      paymentID,
    });

    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la cita", error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appointment) res.status(404).json({ message: "Cita no encontrada" });
    res.json(appointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la cita", error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) res.status(404).json({ message: "Cita no encontrada" });
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la cita", error: error.message });
  }
};

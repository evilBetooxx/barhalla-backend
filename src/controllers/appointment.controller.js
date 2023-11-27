import Appointment from "../models/appointment.model.js";

export const getAppointments = async (req, res) => {
  const { id } = req.user;
  try {
    const appointments = await Appointment.find({clientID: id}).populate("clientID").populate("barberShopID").populate("paymentID");
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las citas", error: error.message });
  }
};

export const getUserAppointments = async (req, res) => {
  const { id } = req.params.id;
  try {
    console.log(req.params.id);
    const appointments = await Appointment.find({ clientID: id });
    if (!appointments) {
      return res.status(404).json({ message: "Appointments not found" });
    }
    console.log(appointments);
    res.status(200).json(appointments);
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

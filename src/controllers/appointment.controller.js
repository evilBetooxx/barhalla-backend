import Appointment from "../models/appointment.model.js";
import Client from "../models/client.model.js";
import BarberShop from "../models/barberShop.model.js";

export const getAppointments = async (req, res) => {
  const { id } = req.user;
  try {
    const appointments = await Appointment.find({ clientID: id })
      .populate("clientID")
      .populate("barberShopID")
      .populate("paymentID");
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las citas", error: error.message });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ clientID: req.user.id }).populate('barberShopID');
    if (!appointments) {
      return res.status(404).json({ message: "Appointments not found" });
    }

    const appointmentsWithBarberShopDetails = appointments.map(appointment => {
      const { barberShopID, ...rest } = appointment.toObject();
      return {
        ...rest,
        barberShopName: barberShopID.name,
        barberShopLogo: barberShopID.logo, 
      };
    });

    console.log(appointmentsWithBarberShopDetails);
    res.status(200).json(appointmentsWithBarberShopDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la cita", error: error.message });
  }
};

export const getBarberAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      barberShopID: req.params.id,
    }).populate("clientID");
    if (!appointments) {
      return res.status(404).json({ message: "Appointments not found" });
    }

    const appointmentsWithClientNames = appointments.map((appointment) => {
      const { clientID, ...rest } = appointment.toObject();
      return {
        ...rest,
        name: clientID.firstName + " " + clientID.lastName,
      };
    });

    console.log(appointmentsWithClientNames);

    res.status(200).json(appointmentsWithClientNames);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la cita", error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { fecha, hora, nombre, precio, barberID } = req.body;

    const newAppointment = new Appointment({
      date: fecha,
      time: hora,
      service: nombre,
      price: precio,
      clientID: req.user.id,
      barberShopID: barberID,
    });

    const savedAppointment = await newAppointment.save();

    const client = await Client.findById(req.user.id);
    client.appointments.push(savedAppointment._id);
    await client.save();

    const barberShop = await BarberShop.findById(barberID);
    barberShop.appointments.push(savedAppointment._id);
    await barberShop.save();

    res.json(savedAppointment);
  } catch (error) {
    console.log(error);
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

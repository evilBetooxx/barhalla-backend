import Review from "../models/review.model.js";
import BarberShop from "../models/barberShop.model.js";
import Client from "../models/client.model.js";

export const createReview = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const { author, barberName, title, comment } = req.body;

  try {
    const newReview = new Review({
      author,
      barberName,
      title,
      comment,
      clientID: req.user.id,
      barberShopID: req.params.id,
    });

    const savedReview = await newReview.save();

    const client = await Client.findById(req.user.id);
    client.reviews.push(savedReview._id);
    await client.save();

    const barberShop = await BarberShop.findById(req.params.id);
    barberShop.reviews.push(savedReview._id);
    await barberShop.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reseña" });
  }
};

export const getBarberReviews = async (req, res) => {
  console.log(req.params.id);
  try {
    const reviews = await Review.find({ barberShopID: req.params.id });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las reseñas" });
  }
};

export const getReviewsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.find({ clientID: id });
    if (!reviews) {
      return res.status(404).json({ message: "Aún no tienes reseñas" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las reseña" });
  }
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { title, comment, rating, clientID, barberShopID } = req.body;

  try {
    const existingReview = await Review.findById(id);

    if (!existingReview) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    existingReview.title = title;
    existingReview.comment = comment;
    existingReview.rating = rating;
    existingReview.clientID = clientID;
    existingReview.barberShopID = barberShopID;

    const updatedReview = await existingReview.save();

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la reseña" });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);

    const client = await Client.findById(deletedReview.clientID);
    client.reviews.pull(id);
    await client.save();

    const barberShop = await BarberShop.findById(deletedReview.barberShopID);
    barberShop.reviews.pull(id);
    await barberShop.save();

    if (!deletedReview) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res.status(200).json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la reseña" });
  }
};

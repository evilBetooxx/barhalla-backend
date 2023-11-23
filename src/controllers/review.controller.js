import Review from "../models/review.model.js";

export const createReview = async (req, res) => {
  const { title, comment, rating, barberShopID } = req.body;
  const { clientID } = user.id;

  try {
    const newReview = new Review({
      title,
      comment,
      rating,
      clientID,
      barberShopID,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reseña" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
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

    if (!deletedReview) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res.status(200).json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la reseña" });
  }
};

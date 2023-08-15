// import User from "../user/UserModel.js";

//! create mew card with userId
export const createCard = async (
  userId,
  cardNumber,
  cardTitle,
  cardDescription
) => {
  const user = await User.findOne({ userId: userId });
  if (!user) throw new Error("No User with this Id");

  // create new card
  const newCard = await Card.create({
    userId: user.userId,
    cardNumber,
    cardTitle,
    cardDescription,
  });

  // push card to user
  await User.findByIdAndUpdate(
    user._id,
    {
      $push: {
        cards: newCard,
      },
    },
    {
      safe: true,
      upsert: true,
    }
  );
  return newCard;
};

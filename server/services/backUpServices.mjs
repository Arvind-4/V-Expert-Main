import { db } from "../index.mjs";

const getAllDataService = async () => {
  const bookingsCollection = await db.collection("bookings");
  const userCollection = await db.collection("users");
  const ratingCollection = await db.collection("ratings");
  const bookingsProp = await bookingsCollection.list();
  const bookings = await Promise.all(
    bookingsProp.results.map(
      async ({ key }) => (await bookingsCollection.get(key)).props
    )
  );
  const userProp = await userCollection.list();
  const users = await Promise.all(
    userProp.results.map(
      async ({ key }) => (await userCollection.get(key)).props
    )
  );
  const ratingProp = await ratingCollection.list();
  const ratings = await Promise.all(
    ratingProp.results.map(
      async ({ key }) => (await ratingCollection.get(key)).props
    )
  );
  if (bookings && users && ratings) {
    return [bookings, users, ratings];
  } else {
    return null;
  }
};

export { getAllDataService };

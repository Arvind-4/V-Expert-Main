import React from "react";
import Rating from "@mui/material/Rating";
import { Alert } from "./Alert";
import { baseUrl } from "../../constants/index";
import "../../assests/css/home.css";

const TestimonyForm = () => {
  const [rating, setRating] = React.useState(0);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");

  const onChangeRating = (event, newValue) => {
    setRating(newValue);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  async function submitHandler(event) {
    event.preventDefault();
    const data = {
      name: name,
      ratingScore: rating,
      email: email,
      review: description,
    };
    if (
      data.ratingScore === 0 ||
      data.ratingScore === null ||
      data.ratingScore === undefined
    ) {
      return Alert("Error", "Please select a rating.", "error");
    } else {
      const response = await fetch(`${baseUrl}/rating/create-rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        // alert("Thank you for your feedback!");
        Alert("Success", "Thank you for your feedback!", "success");
        setName("");
        setRating(0);
        setEmail("");
        setDescription("");
        return;
      } else {
        Alert(
          "Error",
          "Something went wrong. Please try again later.",
          "error"
        );
        // alert("Something went wrong. Please try again later.");
        return;
      }
    }
  }

  return (
    <article className="bg-blue text-white p-8 md:p-4 -mt-16 review-clip border-8 border-white md:w-[448px]">
      <h1 className="text-4xl mb-8 text-center">Rate us</h1>
      <form
        action="#"
        onSubmit={submitHandler}
        className="flex flex-col text-md gap-4"
      >
        <div className="flex items-center gap-x-4">
          <label htmlFor="rating">Rating</label>
          <Rating
            value={rating}
            onChange={onChangeRating}
            id="rating"
            name="half-rating-read"
            precision={0.5}
            size="large"
            required={true}
          />
        </div>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={onChangeName}
          value={name}
          type="text"
          id="name"
          name="name"
          className="p-2 outline-none border-gold border-2 rounded bg-blue"
          required
        />
        <label htmlFor="email">Your Email</label>
        <input
          onChange={onChangeEmail}
          value={email}
          type="email"
          id="email"
          name="email"
          className="p-2 outline-none border-gold border-2 rounded bg-blue"
          required
        />
        <label htmlFor="review">Your Experience</label>
        <textarea
          onChange={onChangeDescription}
          id="review"
          name="review"
          rows={5}
          className="p-2 min-w-[250px] max-w-md outline-none border-gold border-2 rounded bg-blue resize-none "
          value={description}
        />
        <input
          type="submit"
          value={"Submit Feedback"}
          className="cursor-pointer mt-4 px-6 py-2 bg-gold text-blue border-2 border-gold w-fit self-center rounded"
        />
      </form>
    </article>
  );
};

export default TestimonyForm;

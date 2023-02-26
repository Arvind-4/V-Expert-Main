import { baseUrl } from "../../../constants";

async function fetchPending() {
  const response = await fetch(`${baseUrl}/book/pending`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("user"),
    },
  });
  if (response.status === 200) {
    const res = await response.json();
    return res;
  } else {
    return null;
  }
}

async function fetchCompleted() {
  const response = await fetch(`${baseUrl}/book/completed`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("user"),
    },
  });
  if (response.status === 200) {
    const res = await response.json();
    return res;
  } else {
    return null;
  }
}

const getBookings = async (status) => {
  if (status === "pending") {
    return await fetchPending();
  }
  if (status === "complete") {
    return await fetchCompleted();
  } else {
    return null;
  }
};

const bookingComplete = async (id) => {
  const response = await fetch(`${baseUrl}/book/${id}/update-booking`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("user"),
    },
    body: JSON.stringify({ status: "completed" }),
  });
  console.log("response.status", response.status);
  if (response.status === 200) {
    alert("Booking Completed");
    return true;
  } else {
    return false;
  }
};

export { getBookings, bookingComplete };

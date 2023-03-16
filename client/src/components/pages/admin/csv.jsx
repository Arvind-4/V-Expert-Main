import { fileExtension, fileName } from "../../../constants";
import { downloadData } from "./api";

const csvHeaders = [
  "ID",
  "Name",
  "Email",
  "Address",
  "Phone Number",
  "Requirements",
  "Status",
  "Date",
  "Time",
  "Service List",
  "Package List",
  "Created",
  "Updated",
];

const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType });
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

const exportToCsv = async (e) => {
  e.preventDefault();
  try {
    const bookingsData = await downloadData();
    if (!bookingsData) {
      alert("No bookings to download");
      return;
    }
    let bookingCsv = bookingsData.bookings.reduce((acc, booking) => {
      const {
        id,
        name,
        email,
        address,
        phoneNumber,
        requirements,
        status,
        date,
        time,
        serviceList,
        packageList,
        created,
        updated,
      } = booking;
      acc.push(
        [
          id,
          name,
          email,
          address,
          phoneNumber,
          requirements,
          status,
          date,
          time,
          serviceList,
          packageList,
          created,
          updated,
        ].join(",")
      );
      return acc;
    }, []);

    downloadFile({
      data: [...csvHeaders, ...bookingCsv].join("\n"),
      fileName: fileName + "." + fileExtension,
      fileType: "text/csv",
    });
  } catch (err) {
    console.log(err);
  }
};
export { exportToCsv };

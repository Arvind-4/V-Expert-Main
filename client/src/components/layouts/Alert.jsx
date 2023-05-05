import swal from "sweetalert";

function Alert(title, text, icon) {
  swal({
    title: title,
    text: text,
    icon: icon,
  });
}

export { Alert };

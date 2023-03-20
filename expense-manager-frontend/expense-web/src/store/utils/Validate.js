const PATTERN = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+).([a-zA-Z]{2,5})$";

const Validate = (name, value) => {
   let errors = {};
   switch (name) {
      case "firstname":
         errors.first_name = value.length === 0 ? "firstname is required" : "";
         break;
      case "lastname":
         errors.last_name = value.length === 0 ? "lastname is required" : "";
         break;
      case "email":
         errors.email =
            value.length === 0
               ? "Email is required"
               : !value.match(PATTERN)
               ? "Enter a valid email"
               : "";
         break;
      case "password":
         errors.password =
            value.length === 0
               ? "Password is required"
               : value.length < 9
               ? "Password must be atleast 8 characters"
               : "";
         break;
      case "title":
         errors.title = value.length === 0 ? "Title is required" : "";
         break;
      default:
         break;
   }

   return {
      errors
   };
};

export default Validate;
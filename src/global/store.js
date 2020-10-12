import axios from "axios";

export default {
  actions: {
    getAllContact() {
      return axios.get(
        "https://simple-contact-crud.herokuapp.com/contact",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          mode: "no-corse",
        }
      );
    },

    saveNewContact(formData){
      return axios.post(
        "https://simple-contact-crud.herokuapp.com/contact",formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          mode: "no-corse",
        }
      );
    },

    deleteContact(id){
      return axios.delete(
        `https://simple-contact-crud.herokuapp.com/contact/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          mode: "no-corse",
        }
      );
    },

    updateContact(id,data){
      return axios.put(
        `https://simple-contact-crud.herokuapp.com/contact/${id}`,data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          mode: "no-corse",
        }
      );
    },

   searchContact(id){
      return axios.get(
        `https://simple-contact-crud.herokuapp.com/contact/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          mode: "no-corse",
        }
      );
    }
  },
};

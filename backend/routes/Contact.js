const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

router.post("/add-contact", (req, res) => {
  //   let newContact = req.body;
  //   db.collection("usersContacts").insertOne(newContact, (err, data) => {
  //     if (err) res.send("Can't add new contact");
  //     else res.send("New contact added");
  //   });
  let contactFields = {};
  if (req.body.name) contactFields.name = req.body.name;
  if (req.body.phone) contactFields.phone = req.body.phone;
  if (req.body.email) contactFields.email = req.body.email;

  new Contact(contactFields)
    .save()
    .then(contact => res.json(contact))
    .catch(err => console.log(err));
});

router.get("/contacts", (req, res) => {
  //   db.collection("usersContacts")
  //     .find()
  //     .toArray((err, data) => {
  //       if (err) res.send("Can't show contact list");
  //       else res.send(data);
  //     });
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => console.log(err));
});

router.put("/modify-contact/:id", (req, res) => {
  //   let id = ObjectID(req.params.id);
  //   db.collection("usersContacts").findOneAndUpdate(
  //     { _id: id },
  //     { $set: { ...req.body } },
  //     (err, data) => {
  //       if (err) res.send("can't modify contact");
  //       else res.send(data);
  //     }
  //   );
  Contact.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { ...req.body } },
    { new: true }
  )
    .then(updated => res.json(updated))
    .catch(err => console.log(err));
});

router.delete("/delete-contact/:id", (req, res) => {
  Contact.findOneAndDelete({ _id: req.params.id })
    .then(deleted => res.json({ message: "done" }))
    .catch(err => console.log(err));
});

module.exports = router;

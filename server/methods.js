Meteor.methods({
  sendAlertToOwner(alerttype, ownermail) {
    console.log("Executing item detail query on local Cayley database.");

    Email.send({
      to: ownermail,
      from: "floraiot@gmail.com",
      subject: "Water Alert",
      text: "The contents of our email in plain text.",
    });

    return;
  }
});

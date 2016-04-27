Pokemon = new Mongo.Collection('pokemon');

Pokemon.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  description: {
    type: String,
    label: "Description"
  },
  image_url: {
    type: String,
    label: "Image URL"
  }
}));
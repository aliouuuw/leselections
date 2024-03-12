export default {
    name: "live",
    type: "document",
    title: "Live",
    fields: [
      {
        name: "titre",
        type: "string",
        title: "Titre",
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: "datetime",
        type: "datetime",
        title: "Date",
        description: "Date de publication",
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
    ],
  };
  
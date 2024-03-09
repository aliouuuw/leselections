export default {
    name: "la_une",
    type: "document",
    title: "La Une",
    fields: [
      {
        name: "titre",
        type: "string",
        title: "Titre",
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: "slug",
        type: "slug",
        title: "Slug",
        options: {
          source: "titre",
          maxLength: 200, // adjust as needed
        },
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: "image",
        type: "image",
        title: "Image",
        description: "Image de la une",
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name:"description",
        type: "string",
        title: "Description",
        description: "Description ou aperçu de la une"
      },
      {
        name: "contenu",
        type: "array",
        title: "Contenu et Média",
        description:
          "Contenu principal de l'article (peut inclure du texte, images, videos, etc.)",
        of: [
          // Define the block types allowed in the array
          {
            type: "block",
          },
          // You can add other types here like 'image', 'video', etc.
          {
            type: 'image'
          }
        ],
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
    ],
  };
  
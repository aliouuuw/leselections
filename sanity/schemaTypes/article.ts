export default {
    name: "article",
    type: "document",
    title: "Article",
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
        name: "type",
        type: "string",
        title: "Type",
        description:
          "Type d'article",
        options: {
          list: [
            { title: "La Une", value: "la_une" },
            { title: "Article normal", value: "article" },
            { title: "Editorial", value: "editorial" },
          ],
        },
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: "image",
        type: "image",
        title: "Image",
        description: "Image de la une",
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
      {
        name: "datetime",
        type: "datetime",
        title: "Date",
        description: "Date de publication",
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
    ],
  };
  
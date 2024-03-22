export default {
    name: "candidat",
    type: "document",
    title: "Candidat",
    fields: [
      {
        name: "nom",
        type: "string",
        title: "Nom",
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: "slug",
        type: "slug",
        title: "Slug",
        options: {
          source: "nom",
          maxLength: 200, // adjust as needed
        },
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: "photo",
        type: "image",
        title: "Photo de Profil",
      },
      {
        name:"parti",
        type: "string",
        title: "Parti",
        validation: (Rule: { required: () => any }) => Rule.required(),
      },
      {
        name: "age",
        type: "number",
        title: "Âge",
      },
      {
        name: "lieu_de_naissance",
        type: "string",
        title: "Lieu de Naissance",
      },
      {
        name:"apercu",
        type: "string",
        title: "apercu",
        description: "Aperçu/Résumé du profil"
      },
      {
        name: "bio",
        type: "array",
        title: "Bio",
        description:
          "Carrière politique (peut inclure du texte, images, videos, etc.)",
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
        name: "programme",
        type: "file",
        title: "Programme",
        fields: [
          {
            name: "description",
            type: "string",
            title: "Description",
          }
        ],
      },
    ],
  };
  
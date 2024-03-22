export default {
  name: "multimedia",
  type: "document",
  title: "Multimédia",
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
      description: "Type de média",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Podcast", value: "podcast" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "fichier",
      type: "file",
      title: "Fichier",
      fields: [
        {
          name: "description",
          type: "string",
          title: "Description",
        }
      ],
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

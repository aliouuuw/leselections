import { sanityClient } from "@/sanity-client";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");
// Array of objects containing component content
// const componentItems = [
//   {
//     imageAlt: "Aliens Land on Earth",
//     imageUrl: "/filactu/pirogue.jpg",
//     title: "Breaking News: Aliens Land on Earth!",
//     postedTime: "3 minutes ago",
//     description:
//       "In a stunning turn of events, a fleet of alien spacecraft has landed in the heart of New York City. The entire world is watching as diplomats and scientists attempt to make first contact with the extraterrestrial visitors.",
//   },
//   {
//     imageAlt: "Stock Market Surges",
//     imageUrl: "/filactu/mosquee.jpg",
//     title: "Stock Market Surges on News of Alien Contact",
//     postedTime: "15 minutes ago",
//     description:
//       "The global stock market has experienced a massive rally following the announcement of the alien's arrival. Investors are optimistic about the potential for new interstellar trade opportunities and are pouring money into aerospace and technology companies.",
//   },
//   {
//     imageAlt: "World Leaders React",
//     imageUrl: "/filactu/renaissance.jpg",
//     title: "World Leaders React to Alien Arrival",
//     postedTime: "30 minutes ago",
//     description:
//       "Political leaders from around the world have issued statements regarding the alien visitation. While some have expressed hope for peaceful cooperation, others have raised concerns about the potential threat to Earth's security.",
//   },
//   {
//     imageAlt: "Scientists Analyze Communication",
//     imageUrl: "/filactu/resort.jpg",
//     title: "Scientists Analyze Alien Communication",
//     postedTime: "1 hour ago",
//     description:
//       "Linguists and cryptographers are working around the clock to decipher the alien's language and understand their intentions. Initial reports suggest that the extraterrestrials are attempting to convey a message of peace and cooperation.",
//   },
// ];

type ActualitéType = {
  titre: string;
  slug: { current: string };
  datetime: string;
  description: string;
  imageUrl: string;
};

const getActualités = async () => {
  try {
    const article = await sanityClient.fetch(
      `
      *[_type == 'article' && type == "article"] | order(datetime desc) {
        titre,
        slug,
        description,
        datetime,
        "imageUrl": image.asset->url
      }
    `,
      {},
      { next: { revalidate: 0 } }
    );
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};

export default async function NewsContainer() {
  const componentItems: ActualitéType[] = await getActualités();

  return (
    <div className="grid gap-4 mx-auto lg:max-w-screen lg:grid-cols-2 ">
      {componentItems.map((item, index) => (
        <div key={index} className="space-y-2 mb-4">
          <div className="relative">
            <Image
              alt={item.imageUrl}
              className="rounded-lg object-cover w-full"
              height={300}
              width={600}
              src={item.imageUrl}
              style={{
                aspectRatio: "2/1",
                objectFit: "cover",
              }}
            />
          </div>
          <Link href={`/actualites/${item.slug.current}`} target="_blank">
            <h2 className="text-primary text-2xl font-bold my-2 hover:underline">
              {item.titre}
            </h2>
          </Link>
          <p className="text-muted-foreground my-2">
            Publié le {moment(item.datetime).format("dddd Do MMMM, [à] h:mm a")}
          </p>
          <p className="text-pretty text-justify ">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

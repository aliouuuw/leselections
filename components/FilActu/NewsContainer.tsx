import Image from "next/image";

// Array of objects containing component content
const componentItems = [
  {
    imageAlt: "Aliens Land on Earth",
    imageUrl: "/filactu/pirogue.jpg",
    title: "Breaking News: Aliens Land on Earth!",
    postedTime: "3 minutes ago",
    description:
      "In a stunning turn of events, a fleet of alien spacecraft has landed in the heart of New York City. The entire world is watching as diplomats and scientists attempt to make first contact with the extraterrestrial visitors.",
  },
  {
    imageAlt: "Stock Market Surges",
    imageUrl: "/filactu/mosquee.jpg",
    title: "Stock Market Surges on News of Alien Contact",
    postedTime: "15 minutes ago",
    description:
      "The global stock market has experienced a massive rally following the announcement of the alien's arrival. Investors are optimistic about the potential for new interstellar trade opportunities and are pouring money into aerospace and technology companies.",
  },
  {
    imageAlt: "World Leaders React",
    imageUrl: "/filactu/renaissance.jpg",
    title: "World Leaders React to Alien Arrival",
    postedTime: "30 minutes ago",
    description:
      "Political leaders from around the world have issued statements regarding the alien visitation. While some have expressed hope for peaceful cooperation, others have raised concerns about the potential threat to Earth's security.",
  },
  {
    imageAlt: "Scientists Analyze Communication",
    imageUrl: "/filactu/resort.jpg",
    title: "Scientists Analyze Alien Communication",
    postedTime: "1 hour ago",
    description:
      "Linguists and cryptographers are working around the clock to decipher the alien's language and understand their intentions. Initial reports suggest that the extraterrestrials are attempting to convey a message of peace and cooperation.",
  },
];

export default function NewsContainer() {
  return (
    <div className="grid gap-4 mx-auto lg:max-w-screen lg:grid-cols-2 ">
      {componentItems.map((item, index) => (
        <div key={index} className="space-y-2 mb-4">
          <div className="relative">
            <Image
              alt={item.imageAlt}
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
          <h2 className="text-2xl font-bold">{item.title}</h2>
          <p className="text-muted-foreground">Posted {item.postedTime}</p>
          <p className="text-pretty text-justify ">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
